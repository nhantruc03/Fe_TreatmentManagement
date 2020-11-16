import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { AUTH } from '../../env'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

var Genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
]
class editpatients extends Component {
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

    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            birthday: this.state.birthday,
            gender: this.state.gender,
            email: this.state.email,
            job: this.state.job
        };
        Axios.put('/api/patients/' + this.props.match.params.id, data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res);
                this.goBack();
            })
            .catch(err => {
                console.log(err);
            })
    }

    async componentDidMount() {

        this._isMounted = true;
        const [patients] = await Promise.all([
            Axios.get('/api/patients/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);


        if (patients !== null) {
            if (this._isMounted) {
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
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Quay về`}</div>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-createnew">Cập nhập</button>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="section">
                                    <li className="fas fa-user"></li> Bệnh nhân
                                    </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="name"  >Tên</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" value={this.state.name} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-7">
                                        <label htmlFor="phoneNumber"  >Điện thoại</label>
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
                                            value={Genders.filter((value) => value === this.state.gender)}
                                            options={Genders}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="job"  >Nghệ nghiệp</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="job" placeholder="Eg. sinh viên" value={this.state.job} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="email"  >Email</label>
                                        <input onChange={(e) => this.onChange(e)} type="email" className="form-control" name="email" placeholder="Eg. abc**@gmail.com" value={this.state.email} required={true} />
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

export default editpatients;