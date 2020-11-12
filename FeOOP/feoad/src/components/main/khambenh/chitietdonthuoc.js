import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import { AUTH } from '../../env';
const tablerow = ['Name', 'Unit', 'Quantity', 'Price']
const keydata = ['medicineId.name', 'medicineId.unit', 'quantity', 'medicineId.price']
class chitietdonthuoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            conclude: '',
            type: 'donthuoc',
            name: ''
        }
    }

    add = (e) => {
        var data = {
            medicineId: e,
            quantity: 1
        }

        var temp = this.state.data.filter(el => el.medicineId._id === data.medicineId._id)
        if (temp.length === 0) {
            this.setState({
                data: [...this.state.data, data]
            })
        }
        else {
            this.setState({
                data: this.state.data.map(el => (el.medicineId._id === data.medicineId._id ? { ...el, quantity: temp[0].quantity + 1 } : el))
            });
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    quantity_change = (e) => {
        this.setState({
            data: this.state.data.map(el => (el.medicineId._id === e.id ? { ...el, quantity: Number(e.quantity) } : el))
        });
    }

    delete = (e) => {
        this.setState({
            data: this.state.data.filter(el => el.medicineId._id !== e)
        });
    }

    Create = async () => {
        const login = localStorage.getItem('login');
        const obj = JSON.parse(login);
        var data = {
            name: this.state.name,
            pharmacistId: obj.id,
            conclude: this.state.conclude,
            prescriptionId: this.props.match.params.id
        }
        var curprescriptions_bill = await Axios.post('/prescription-bills', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                return (
                    res.data.data._id
                )
            })
            .catch(err => {
                console.log(err);
            })


        this.state.data.forEach(async (value) => {
            data = {
                prescriptionbillId: curprescriptions_bill,
                medicineId: value.medicineId._id,
                quantity: value.quantity
            }
            await Axios.post('/prescription-bill-details', data, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then(res => {
                    console.log(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })

        this.goBack();

    }


    async componentDidMount() {
        this._isMounted = true;
        const [prescription_details, prescriptions] = await Promise.all([
            Axios.post('/prescription-details/getAll', { prescriptionId: this.props.match.params.id }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/prescriptions/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);
        if (prescription_details !== null && prescriptions !== null) {
            if (this._isMounted) {
                this.setState({
                    data: prescription_details,
                    SearchData: prescription_details,
                    conclude: prescriptions.conclude,
                    name: prescriptions.medicalrecordId.patientId.name
                })
            }
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    goBack = () => {
        this.props.history.goBack();
    }

    printData = (data) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Quay về`}</div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <TableData
                            noaction={true}
                            dataRow={tablerow}
                            data={data}
                            keydata={keydata}
                            type={this.state.type}
                            quantity_change={(e) => this.quantity_change(e)}
                            delete={(e) => this.delete(e)}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="conclude" className='subject'>Kết luận</label>
                            <textarea onChange={(e) => this.onChange(e)} rows='5' type="text" className="form-control" placeholder="Eg. conclude" name="conclude" value={this.state.conclude} readOnly></textarea>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div className='mt-5'>
                    <h1 className='text-primary mb-3'>Đơn thuốc</h1>
                </div>
            )
        }
    }
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {this.printData(this.state.data)}
                    </div>
                </div>
            </div>
        );
    }
}

export default chitietdonthuoc;