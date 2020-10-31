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
class addusers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
            role: 'client',
            username: '',
            password: '',
            list_faculties: [],
            list_departments: [],
            departmentId: '',
            facultyId: '',
            email: '',
            gender: 'male',
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
        console.log(data)
        Axios.post('/users', data, {
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
        const [faculties, departments] = await Promise.all([
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


        if (faculties !== null && departments !== null) {
            if (this._isMounted) {
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
                                <div onClick={() => this.onDone()} className='subject'> {`<- Create new user`}</div>
                            </div>
                            <div className="col">
                                {/* <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button> */}
                                <button type="submit" className="btn btn-createnew">Thêm</button>
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
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="username" placeholder="Tài khoản" required={true} />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="name"  >Name</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            <label htmlFor="phoneNumber"  >Phone</label>
                                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Eg. 0919385172" required={true} />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="address">Address</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Eg. 37/10BIS" required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            {this.state.birthday && <label htmlFor="address">Day: {this.state.birthday}</label>}
                                            {!this.state.birthday && <label htmlFor="address">Day</label>}
                                            <DayPickerInput onDayChange={this.handleDayChange} />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="gender"  >Gender</label>
                                            <Select
                                                onChange={(e) => this.onSelectGender(e)}
                                                defaultValue={Genders[1]}
                                                options={Genders}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="email"  >Email</label>
                                            <input onChange={(e) => this.onChange(e)} type="email" className="form-control" name="email" placeholder="Eg. abc**@gmail.com" required={true} />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <br></br>
                                    <label htmlFor="password"  >Mật khẩu</label>
                                    <input onChange={(e) => this.onChange(e)} type="password" className="form-control" name="password" placeholder="Mật khẩu" required={true} />
                                </div>
                                <div className="col-1"></div>
                                <div className="col-5">
                                    <div className="section">
                                        <li className="fas fa-file"></li> Work
                                    </div>
                                    <label className="mt-3" htmlFor="role"  >Role</label>
                                    <Select
                                        onChange={(e) => this.onSelectRole(e)}
                                        // defaultValue={Roles[1]}
                                        options={Roles}
                                    />

                                    <label className="mt-3" htmlFor="departmentId"  >Department</label>
                                    <Select
                                        onChange={(e) => this.onSelectDepartment(e)}
                                        // defaultValue={Roles[1]}
                                        options={this.state.list_departments}
                                    />

                                    <label className="mt-3" htmlFor="facultyId"  >Faculty</label>
                                    <Select
                                        onChange={(e) => this.onSelectFaculty(e)}
                                        // defaultValue={Roles[1]}
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

export default addusers;