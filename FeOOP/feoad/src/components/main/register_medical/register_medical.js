import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import { AUTH } from '../../env'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
var Genders = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' }
]
class register_medical extends Component {
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
            isDone: false
        }
    }

    handleDayChange = (selectedDay) => {
        this.setState({
            birthday: selectedDay
        })
    }

    onSelectGender = (e) => {
        this.setState({
            gender: e.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        var temp_patient_id = '';
        // old patient
        if (this.state._id !== '') {
            temp_patient_id = this.state._id;
        }
        // new patient
        else {
            // create new patient
            var data = {
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                birthday: this.state.birthday,
                gender: this.state.gender,
                email: this.state.email,
                job: this.state.job
            };
            await Axios.post('/patients/', data, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then(res => {
                    temp_patient_id = res.data.data._id;
                })
                .catch(err => {
                    console.log(err);
                })
        }

        var temp_medicalrecord_id = ''

        data = {
            patientId: temp_patient_id,
            reason: this.state.reason,
            status: 'chờ'
        }

        await Axios.post('/medical-records/', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res.data.data);
                temp_medicalrecord_id = res.data.data._id;
            })
            .catch(err => {
                console.log(err);
            })

        data = {
            medicalrecordIds: [temp_medicalrecord_id]
        };
        await Axios.put('/departments/' + this.props.match.params.id + '/add-patients', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res);
                this.onDone();
            })
            .catch(err => {
                console.log(err);
            })



    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }


    Find = async (e) => {
        e.preventDefault();
        const [patients] = await Promise.all([
            Axios.get('/patients/' + this.state._id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);


        if (patients !== null) {
            var day = new Date(patients.birthday);
            this.setState({
                _id: patients._id,
                name: patients.name,
                address: patients.address,
                phoneNumber: patients.phoneNumber,
                birthday: day,
                gender: patients.gender,
                email: patients.email,
                job: patients.job
            })
        }
    }

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/home" />
            )
        }
        else {
            return (
                <form onSubmit={this.onSubmit}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <div onClick={() => this.onDone()} className='subject'> {`<- Quay về`}</div>
                            </div>
                            <div className="col">
                                {/* <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button> */}
                                <button type="submit" className="btn btn-createnew">Đăng kí khám bệnh</button>
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
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="_id" value={this.state._id} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <button onClick={(e) => this.Find(e)} style={{ width: '100%' }} className="btn btn-createnew">Tìm kiếm</button>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="name"  >Tên</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" value={this.state.name} required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            <label htmlFor="phoneNumber"  >Số điện thoại</label>
                                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Eg. 0919385172" value={this.state.phoneNumber} required={true} />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Eg. 37/10BIS" value={this.state.address} required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            {this.state.birthday && <label htmlFor="address">Ngày: {this.state.birthday.toLocaleDateString()}</label>}
                                            {!this.state.birthday && <label htmlFor="address">Ngày</label>}
                                            <DayPickerInput
                                                onDayChange={this.handleDayChange}
                                                value={this.state.birthday}
                                            />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="gender"  >Giới tính</label>
                                            <Select
                                                onChange={(e) => this.onSelectGender(e)}
                                                value={Genders.filter(({ value }) => value === this.state.gender)}
                                                options={Genders}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="job"  >Nghề nghiệp</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="job" placeholder="Eg. sinh viên" value={this.state.job} required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="email"  >Email</label>
                                            <input onChange={(e) => this.onChange(e)} type="email" className="form-control" name="email" placeholder="Eg. abc**@gmail.com" value={this.state.email} required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="reason"  >Lý do khám</label>
                                            <textarea onChange={(e) => this.onChange(e)} type="text" rows="5" className="form-control" name="reason" placeholder="Eg. headache" required={true} />
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
}

export default register_medical;