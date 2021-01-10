import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';
import { trackPromise } from 'react-promise-tracker';
class addservices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            note: '',
            isDone: false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            price: this.state.price,
            note: this.state.note
        };
        await trackPromise(Axios.post('/api/services', data, {
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
            }))
    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/listservices" />
            )
        }
        else {
            return (
                <form onSubmit={this.onSubmit}>
                    <div className="container-fluid" style={{paddingLeft: '150px', paddingRight: '150px'}}>
                        <div className="row">
                            <div className="col-9">
                                <div onClick={() => this.goBack()} className='subject'> {`<- Thêm dịch vụ`}</div>
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-createnew">Tạo mới</button>
                            </div>
                        </div>

                        <div className="container-fluid mt-3">
                            <div className="row mt-3">
                                <div className="col">
                                    <label htmlFor="name"  >Tên</label>
                                    <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Eg. name" required={true} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <label htmlFor="price"  >Giá</label>
                                    <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="price" placeholder="Eg. 100000" required={true} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <label htmlFor="note"  >Ghi chú</label>
                                    <textarea rows="5" onChange={(e) => this.onChange(e)} type="text" className="form-control" name="note" placeholder="Eg. notes" required={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            );
        }
    }
}

export default addservices;