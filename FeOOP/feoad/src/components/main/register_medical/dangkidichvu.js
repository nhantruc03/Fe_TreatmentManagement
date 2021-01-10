import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { AUTH } from '../../env'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { trackPromise } from 'react-promise-tracker';
var Genders = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' }
]
class dangkidichvu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            name: '',
            address: '',
            phoneNumber: '',
            email: '',
            gender: '',
            job: '',
            birthday: new Date(),
            reason: '',
            isDone: false,
            list_services: [],
            serviceId: '',
            note: ''
        }
    }

    onSelectService = (e) => {
        this.setState({
            serviceId: e.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount() {
        this._isMounted = true;
        const [medical_record, services] = await trackPromise(Promise.all([
            Axios.get('/api/medical-records/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/api/services', {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));

        if (medical_record !== null && services !== null) {
            if (this._isMounted) {
                var day = new Date(medical_record.patientId.birthday);
                this.setState({
                    name: medical_record.patientId.name,
                    address: medical_record.patientId.address,
                    phoneNumber: medical_record.patientId.phoneNumber,
                    birthday: day,
                    gender: medical_record.patientId.gender,
                    email: medical_record.patientId.email,
                    job: medical_record.patientId.job,
                    reason: medical_record.reason,
                    status: medical_record.status,
                    _id: medical_record.patientId._id
                })


                var temp = [];
                services.forEach(e => {
                    var o = {
                        value: e._id,
                        label: e.name
                    };
                    temp.push(o);
                })
                this.setState({
                    list_services: temp
                })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSubmit = async (e) => {
        e.preventDefault();

        var data = {
            medicalrecordId: [this.props.match.params.id]
        };
        var curBill = await trackPromise(Axios.post('/api/medical-bills/getAll', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                return (
                    res.data.data[0]._id
                )
            })
            .catch(err => {
                console.log(err);
            }))

        if (curBill === undefined) {
            data = {
                medicalrecordId: this.props.match.params.id
            }
            curBill = await trackPromise(Axios.post('/api/medical-bills', data, {
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
        }

        console.log(curBill);

        data = {
            note: this.state.note,
            serviceId: this.state.serviceId,
            medicalBillId: curBill
        }
        await trackPromise(Axios.post('/api/medical-bill-details', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(() => {
                this.props.history.goBack();
            })
            .catch(err => {
                console.log(err);
            }))

    }

    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div style={{paddingLeft: '150px', paddingRight: '150px', paddingBottom: '50px'}} className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div onClick={this.goBack} className='subject'> {`<- Đăng kí dịch vụ`}</div>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-createnew">Đăng kí</button>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="section">
                                    <li className="fas fa-user"></li> Thông tin
                                    </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="_id"  >Id</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="_id" value={this.state._id} readOnly />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="name"  >Tên</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" value={this.state.name} required={true} readOnly />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="phoneNumber"  >Điện thoại</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Eg. 0919385172" value={this.state.phoneNumber} required={true} readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="address">Địa chỉ</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Eg. 37/10BIS" value={this.state.address} required={true} readOnly />
                                    </div>
                                    <div className="col">
                                        {this.state.birthday && <label htmlFor="address">Ngày: {this.state.birthday.toLocaleDateString()}</label>}
                                        {!this.state.birthday && <label htmlFor="address">Ngày</label>}
                                        <DayPickerInput
                                            onDayChange={this.handleDayChange}
                                            value={this.state.birthday}
                                            inputProps={{ disabled: true }}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="gender"  >Giới tính</label>
                                        <Select
                                            onChange={(e) => this.onSelectGender(e)}
                                            value={Genders.filter(({ value }) => value === this.state.gender)}
                                            options={Genders}
                                            isDisabled={true}
                                        />
                                    </div>
                                </div>
                               
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="job"  >Nghệ nghiệp</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="job" placeholder="Eg. sinh viên" value={this.state.job} required={true} readOnly />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="email"  >Email</label>
                                        <input onChange={(e) => this.onChange(e)} type="email" className="form-control" name="email" placeholder="Eg. abc**@gmail.com" value={this.state.email} required={true} readOnly />
                                    </div>
                                </div>
                                
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="reason"  >Lý do</label>
                                        <textarea onChange={(e) => this.onChange(e)} type="text" rows="4" className="form-control" name="reason" placeholder="Eg. headache" value={this.state.reason} required={true} readOnly />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="service"  >Dịch vụ</label>
                                        <Select
                                            onChange={(e) => this.onSelectService(e)}
                                            options={this.state.list_services}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="note"  >Ghi chú</label>
                                        <textarea rows="2" onChange={(e) => this.onChange(e)} type="text" className="form-control" name="note" placeholder="Eg. notes" value={this.state.note} required={true} />
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default dangkidichvu;