import Axios from 'axios';
import React, { Component } from 'react';
import Danhsachthuoc from '../danhsachthuoc';
import TableData from '../table';
import { AUTH } from '../../env';
import { trackPromise } from 'react-promise-tracker';
import { Message } from '../service/renderMessage';
const tablerow = ['Name', 'Unit', 'Quantity', 'Price', 'Thao tác']
const keydata = ['medicineId.name', 'medicineId.unit', 'quantity', 'medicineId.price']
class xemdonthuoc extends Component {
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
        var curprescriptions_bill = await trackPromise(Axios.post('/api/prescription-bills', data, {
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
            }))

        let list_temp = [];
        this.state.data.forEach(async (value) => {
            data = {
                prescriptionbillId: curprescriptions_bill,
                medicineId: value.medicineId._id,
                quantity: value.quantity
            }
            list_temp.push(data)
            
        })
        await trackPromise(Axios.post('/api/prescription-bill-details', list_temp, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                Message('Tạo thành công', true, this.props);
            })
            .catch(err => {
                Message('Tạo thất bại', false);
            }))
    }


    async componentDidMount() {
        this._isMounted = true;
        const [prescription_details, prescriptions] = await trackPromise(Promise.all([
            Axios.post('/api/prescription-details/getAll', { prescriptionId: this.props.match.params.id }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/api/prescriptions/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));
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

    printData = (data) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={this.goBack} className='subject'>{`<- Đơn thuốc`}</div>
                        </div>
                        <div className="col">
                            <div onClick={() => this.Create()} className="btn btn-createnew">+ Tạo hóa đơn thuốc</div>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="name"  >Tên người mua</label>
                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Eg. name" required={true} value={this.state.name} />
                    </div>
                    <div className="row mt-3">
                        <TableData
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
                            <textarea onChange={(e) => this.onChange(e)} rows='5' type="text" className="form-control" placeholder="Eg. conclude" name="conclude" value={this.state.conclude}></textarea>
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
                    <div className="col-4">
                        <Danhsachthuoc add={(e) => this.add(e)} />
                    </div>
                    <div className="col-7">
                        {this.printData(this.state.data)}
                    </div>
                </div>
            </div>
        );
    }
}

export default xemdonthuoc;