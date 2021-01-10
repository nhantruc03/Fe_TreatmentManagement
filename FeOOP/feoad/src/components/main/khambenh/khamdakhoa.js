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

var Statuss = [
    { value: 'chờ', label: 'chờ' },
    { value: 'chờ chuyên khoa', label: 'chờ chuyên khoa' },
    { value: 'xong', label: 'xong' }
]

class khamdakhoa extends Component {
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
            status: '',
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

    onSelectStatus = (e) => {
        this.setState({
            status: e.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
        const [medical_record] = await trackPromise(Promise.all([
            Axios.get('/api/medical-records/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));

        if (medical_record !== null) {
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
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    onSubmit = async (e) => {
        e.preventDefault();
        var data = {
            reason: this.state.reason,
            status: this.state.status
        }
        await trackPromise(Axios.put('/api/medical-records/' + this.props.match.params.id, data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then((res) => {
                console.log(res.data);
                this.goBack();
            }))
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid" style={{paddingLeft: '150px', paddingRight: '150px', paddingBottom: '100px'}}>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={this.goBack} className='subject'> {`<- Hồ sơ khám bệnh`}</div>
                        </div>
                        <div className="col" style={{paddingRight:'32px'}}>
                            <button type="submit" className="btn btn-createnew" >Cập nhật</button>
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
                                            value={Genders.filter((value) => value === this.state.gender)}
                                            options={Genders}
                                            isDisabled={true}
                                        />
                                    </div>
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
                                        <textarea onChange={(e) => this.onChange(e)} type="text" rows="5" className="form-control" name="reason" placeholder="Eg. headache" value={this.state.reason} required={true} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="status"  >Trạng thái</label>
                                        <Select
                                            onChange={(e) => this.onSelectStatus(e)}
                                            value={Statuss.filter(({ value }) => value === this.state.status)}
                                            options={Statuss}
                                        />
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

export default khamdakhoa;