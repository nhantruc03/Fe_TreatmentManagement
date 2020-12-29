import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';
import { trackPromise } from 'react-promise-tracker';

class adddepartments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
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
        Axios.post('/api/departments', data, {
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
        const [faculties] = await trackPromise(Promise.all([
            Axios.post('/api/faculties/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));


        if (faculties !== null) {
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
                <div className="container-fluid" style={{paddingLeft: '150px', paddingRight: '150px'}}>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Quay về`}</div>
                        </div>
                        <div className="col" style={{paddingRight: '140px'}}>
                            <button type="submit" className="btn btn-createnew">Tạo mới</button>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col-5">
                                <div className="row mt-3">
                                    <label htmlFor="name"  >Tên</label>
                                    <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Eg. name" required={true} />
                                </div>
                                <div className="row mt-3">
                                    <label htmlFor="phoneNumber"  >Điện thoại</label>
                                    <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Eg. 0919385172" required={true} />
                                </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-5">
                                <label className="mt-3" htmlFor="facultyId"  >Khoa</label>
                                <Select
                                    onChange={(e) => this.onSelectFaculty(e)}
                                    // defaultValue={Roles[1]}
                                    options={this.state.list_faculties}
                                />
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <label htmlFor="room"  >Phòng</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="room" placeholder="Eg. 101" required={true} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="floor"  >Tầng</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="floor" placeholder="Eg. 1" required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className='col-12'>
                                        <label htmlFor="note"  >Ghi chú</label>
                                        <textarea onChange={(e) => this.onChange(e)} rows="5" type="text" className="form-control" name="note" placeholder="Eg. 1" required={true} />
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

export default adddepartments;