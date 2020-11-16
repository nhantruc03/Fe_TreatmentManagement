import Axios from 'axios';
import React, { Component } from 'react';
import Danhsachthuoc from '../danhsachthuoc';
import TableData from '../table';
import { AUTH } from '../../env';
const tablerow = ['Tên', 'Đơn vị tính', 'Số lượng', 'Thao tác']
const keydata = ['medicineId.name', 'medicineId.unit', 'quantity']
class taodonthuoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            conclude: '',
            type: 'donthuoc'
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
            medicalrecordId: this.props.match.params.id,
            doctorId: obj.id,
            conclude: this.state.conclude
        }
        var curprescriptions = await Axios.post('/api/prescriptions', data, {
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
                prescriptionId: curprescriptions,
                medicineId: value.medicineId._id,
                quantity: value.quantity
            }
            await Axios.post('/api/prescription-details', data, {
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

    printData = (data) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div className='subject'>Đơn thuốc</div>
                        </div>
                        <div className="col">
                            <div onClick={() => this.Create()} className="btn btn-createnew">+ Tạo đơn thuốc</div>
                        </div>
                    </div>
                    <TableData
                        dataRow={tablerow}
                        data={data}
                        keydata={keydata}
                        type={this.state.type}
                        quantity_change={(e) => this.quantity_change(e)}
                        delete={(e) => this.delete(e)}
                    />
                    <div className="row">
                        <div className="col">
                            <label htmlFor="conclude" className='subject'>Conclude</label>
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
            <div className="row">
                <div className="col-4">
                    <Danhsachthuoc add={(e) => this.add(e)} />
                </div>
                <div className="col">
                    {this.printData(this.state.data)}
                </div>
            </div>
        );
    }
}

export default taodonthuoc;