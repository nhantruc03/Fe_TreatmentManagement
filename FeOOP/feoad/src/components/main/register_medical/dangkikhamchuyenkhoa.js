import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { AUTH } from '../../env'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { trackPromise } from 'react-promise-tracker';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://localhost:3001');
var Genders = [
    { value: 'male', label: 'Nam Nữ' },
    { value: 'female', label: 'Female' }
]

class dangkikhamchuyenkhoa extends Component {
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
            list_departments: [],
            departmentId: ''
        }
    }

    handleDayChange = (selectedDay) => {
        this.setState({
            birthday: selectedDay
        })
    }

    onSelectDepartment = (e) => {
        this.setState({
            departmentId: e.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async componentDidMount() {
        this._isMounted = true;
        const [medical_record, departments] = await trackPromise(Promise.all([
            Axios.get('/api/medical-records/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.post('/api/departments/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));

        if (medical_record !== null && departments !== null) {
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
                departments.forEach(e => {
                    var o = {
                        value: e._id,
                        label: e.name
                    };
                    temp.push(o);
                })
                this.setState({
                    list_departments: temp
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
            medicalrecordIds: [this.props.match.params.id]
        };
        await Axios.put('/api/departments/' + this.state.departmentId + '/add-patients', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res);
                client.send(JSON.stringify({
                    type: "ADD",
                    id: res.data.data[0]._id,
                    data: res.data.data[0].queue
                }))
                this.goBack()
            })
            .catch(err => {
                console.log(err);
            })
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div style={{paddingLeft: '150px', paddingRight: '150px', paddingBottom:'80px'}} className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div onClick={this.goBack} className='subject'> {`<- Đăng kí khám chuyên khoa`}</div>
                        </div>
                        <div className="col" style={{paddingRight: '35px'}}>
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
                                    
                                    
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="job"  >Nghề nghiệp</label>
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
                                        <textarea onChange={(e) => this.onChange(e)} type="text" rows="5" className="form-control" name="reason" placeholder="Eg. headache" value={this.state.reason} required={true} readOnly />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="department"  >Phòng chuyên khoa</label>
                                        <Select
                                            onChange={(e) => this.onSelectDepartment(e)}
                                            options={this.state.list_departments}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default dangkikhamchuyenkhoa;