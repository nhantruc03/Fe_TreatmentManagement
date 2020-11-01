import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';

class editdepartments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            floor: '',
            room: '',
            note: '',
            list_faculties: [],
            facultyId: '',
            isDone: false
        }
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
            floor: this.state.floor,
            room: this.state.room,
            note: this.state.note,
            phoneNumber: this.state.phoneNumber,
            facultyId: this.state.facultyId
        };
        console.log(data)
        Axios.put('/departments', data, {
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
        const [department, faculties] = await Promise.all([
            Axios.get('/departments/' + this.props.match.params.id, {
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
                )
        ]);


        if (faculties !== null && department !== null) {
            if (this._isMounted) {

                this.setState({
                    name: department.name,
                    floor: department.floor,
                    room: department.room,
                    note: department.note,
                    phoneNumber: department.phoneNumber,
                    facultyId: department.facultyId
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
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/listdepartments" />
            )
        }
        else {
            return (
                <form onSubmit={this.onSubmit}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <div onClick={() => this.onDone()} className='subject'> {`<- Edit deparment`}</div>
                            </div>
                            <div className="col">
                                {/* <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button> */}
                                <button type="submit" className="btn btn-createnew">Create</button>
                            </div>
                        </div>

                        <div className="container-fluid mt-3">
                            <div className="row">
                                <div className="col-5">
                                    <div className="row mt-3">
                                        <label htmlFor="name"  >Name</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Eg. name" value={this.state.name} required={true} />
                                    </div>
                                    <div className="row mt-3">
                                        <label htmlFor="phoneNumber"  >Phone</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Eg. 0919385172" value={this.state.phoneNumber} required={true} />
                                    </div>
                                </div>
                                <div className="col-1"></div>
                                <div className="col-5">
                                    <label className="mt-3" htmlFor="facultyId"  >Faculty</label>
                                    <Select
                                        onChange={(e) => this.onSelectFaculty(e)}
                                        value={this.state.list_faculties.filter(({ value }) => value === this.state.facultyId)}
                                        options={this.state.list_faculties}
                                    />
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <label htmlFor="room"  >Room</label>
                                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="room" placeholder="Eg. 101" value={this.state.room} required={true} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="floor"  >Floor</label>
                                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="floor" placeholder="Eg. 1" value={this.state.floor} required={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className='col-12'>
                                            <label htmlFor="note"  >Note / Remark</label>
                                            <textarea onChange={(e) => this.onChange(e)} rows="5" type="text" className="form-control" name="note" placeholder="Eg. 1" value={this.state.note} required={true} />
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

export default editdepartments;