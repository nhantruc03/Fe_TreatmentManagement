import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { AUTH } from '../../env'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { trackPromise } from 'react-promise-tracker';
var Roles = [
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'doctor', label: 'Bác sĩ' },
    { value: 'pharmacist', label: 'Dược sĩ' },
    { value: 'staff', label: 'Nhân viên' }
];

var Genders = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' }
]
class editusers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
            role: '',
            username: '',
            password: '',
            list_faculties: [],
            list_departments: [],
            departmentId: '',
            facultyId: '',
            email: '',
            gender: '',
            birthday: new Date(),
            isDone: false
        }
    }

    handleDayChange = (selectedDay) => {
        this.setState({
            birthday: selectedDay
        })
    }

    onSelectRole = (e) => {
        this.setState({
            role: e.value
        })
    }
    onSelectGender = (e) => {
        this.setState({
            gender: e.value
        })
    }

    onSelectDepartment = (e) => {
        this.setState({
            departmentId: e.value
        })
    }

    onSelectFaculty = (e) => {
        this.setState({
            facultyId: e.value
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
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
            departmentId: this.state.departmentId,
            facultyId: this.state.facultyId,
            birthday: this.state.birthday,
            gender: this.state.gender,
            email: this.state.email
        };
        Axios.put('/api/users/' + this.props.match.params.id, data, {
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

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    async componentDidMount() {
        this.setState({
            isLoad: true
        })
        this.setState({
            isLoad: false
        })

        this._isMounted = true;
        const [user, faculties, departments] = await trackPromise(Promise.all([
            Axios.get('/api/users/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.post('/api/faculties/getAll', {}, {
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


        if (faculties !== null && departments !== null && user !== null) {
            if (this._isMounted) {
                var day = new Date(user.birthday);
                console.log(typeof (day))
                this.setState({
                    name: user.name,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    username: user.username,
                    password: user.password,
                    role: user.role,
                    departmentId: user.departmentId,
                    facultyId: user.facultyId,
                    birthday: day,
                    gender: user.gender,
                    email: user.email
                })


                var temp = [];
                faculties.forEach(e => {
                    var o = {
                        value: e._id,
                        label: e.name
                    };
                    temp.push(o);
                })
                this.setState({
                    list_faculties: temp
                })

                temp = [];
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

    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Back`}</div>
                        </div>
                        <div className="col">
                            {/* <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button> */}
                            <button type="submit" className="btn btn-createnew">Sửa</button>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col-5">
                                <div className="section">
                                    <li className="fas fa-user"></li> Thông tin
                                    </div>
                                <div className="row mt-3">
                                    <div className="col-7">
                                        <label htmlFor="username"  >Tài khoản</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="username" placeholder="Tài khoản" value={this.state.username} required={true} />
                                    </div>
                                    <div className="col-5">
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
                                        {this.state.birthday && <label htmlFor="birthday">Ngày: {this.state.birthday.toLocaleDateString()}</label>}
                                        {!this.state.birthday && <label htmlFor="birthday">Ngày</label>}
                                        <DayPickerInput
                                            onDayChange={this.handleDayChange}
                                            value={this.state.birthday}
                                            dayPickerProps={{
                                                selectedDays: this.state.birthday
                                            }}
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
                                        <label htmlFor="email"  >Email</label>
                                        <input onChange={(e) => this.onChange(e)} type="email" className="form-control" name="email" placeholder="Eg. abc**@gmail.com" value={this.state.email} required={true} />
                                    </div>
                                </div>
                                <hr></hr>
                                <br></br>
                                <label htmlFor="password"  >Mật khẩu</label>
                                <input onChange={(e) => this.onChange(e)} type="password" className="form-control" name="password" placeholder="Mật khẩu" value={this.state.password} required={true} />
                            </div>
                            <div className="col-1"></div>
                            <div className="col-5">
                                <div className="section">
                                    <li className="fas fa-file"></li> Công việc
                                    </div>
                                <label className="mt-3" htmlFor="role"  >Chức vụ</label>
                                <Select
                                    onChange={(e) => this.onSelectRole(e)}
                                    value={Roles.filter(({ value }) => value === this.state.role)}
                                    options={Roles}
                                />

                                <label className="mt-3" htmlFor="departmentId"  >Phòng</label>
                                <Select
                                    onChange={(e) => this.onSelectDepartment(e)}
                                    value={this.state.list_departments.filter(({ value }) => value === this.state.departmentId)}
                                    options={this.state.list_departments}
                                />

                                <label className="mt-3" htmlFor="facultyId"  >Khoa</label>
                                <Select
                                    onChange={(e) => this.onSelectFaculty(e)}
                                    value={this.state.list_faculties.filter(({ value }) => value === this.state.facultyId)}
                                    options={this.state.list_faculties}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default editusers;