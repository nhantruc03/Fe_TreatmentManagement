import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import { AUTH } from '../../env'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
var Roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'doctor', label: 'Client' },
    { value: 'pharmacist', label: 'pharmacist' },
    { value: 'staff', label: 'Staff' }
];

var Genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
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
            birthday: undefined,
            isDone: false
        }
    }

    handleDayChange = (day) => {
        console.log(day)
        if (day instanceof Date) {
            this.setState({
                birthday: day.toLocaleDateString()
            });
        }
        else {
            this.setState({
                birthday: day
            })
        }

        console.log(this.state.birthday)
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
        Axios.put('/users/' + this.props.match.params.id, data, {
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

    async componentDidMount() {
        this.setState({
            isLoad: true
        })
        this.setState({
            isLoad: false
        })

        this._isMounted = true;
        const [user, faculties, departments] = await Promise.all([
            Axios.get('/users/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/faculties', {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/departments', {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);


        if (faculties !== null && departments !== null && user !== null) {
            if (this._isMounted) {

                this.setState({
                    name: user.name,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    username: user.username,
                    password: user.password,
                    role: user.role,
                    departmentId: user.departmentId,
                    facultyId: user.facultyId,
                    birthday: user.birthday,
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

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/listusers" />
            )
        }
        else {
            return (
                <form onSubmit={this.onSubmit}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <div onClick={() => this.onDone()} className='subject'> {`<- Edit user`}</div>
                            </div>
                            <div className="col">
                                {/* <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button> */}
                                <button type="submit" className="btn btn-createnew">Edit</button>
                            </div>
                        </div>

                        <div className="container-fluid mt-3">
                            <div className="row">
                                <div className="col-5">
                                    <div className="section">
                                        <li className="fas fa-user"></li> Account
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            <label htmlFor="username"  >User name</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="username" placeholder="Tài khoản" value={this.state.username} required={true} />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="name"  >Name</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" value={this.state.name} required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            <label htmlFor="phoneNumber"  >Phone</label>
                                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Eg. 0919385172" value={this.state.phoneNumber} required={true} />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="address">Address</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Eg. 37/10BIS" value={this.state.address} required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            {this.state.birthday && <label htmlFor="address">Day: {this.state.birthday}</label>}
                                            {!this.state.birthday && <label htmlFor="address">Day</label>}
                                            <DayPickerInput onDayChange={this.handleDayChange} value={this.state.birthday}/>
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="gender"  >Gender</label>
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
                                        <li className="fas fa-file"></li> Work
                                    </div>
                                    <label className="mt-3" htmlFor="role"  >Role</label>
                                    <Select
                                        onChange={(e) => this.onSelectRole(e)}
                                        value={Roles.filter(({ value }) => value === this.state.role)}
                                        options={Roles}
                                    />

                                    <label className="mt-3" htmlFor="departmentId"  >Department</label>
                                    <Select
                                        onChange={(e) => this.onSelectDepartment(e)}
                                        value={this.state.list_departments.filter(({ value }) => value === this.state.departmentId)}
                                        options={this.state.list_departments}
                                    />

                                    <label className="mt-3" htmlFor="facultyId"  >Faculty</label>
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
}

export default editusers;