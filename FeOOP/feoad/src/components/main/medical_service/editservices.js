import Axios from 'axios';
import React, { Component } from 'react';
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';

class editservices extends Component {
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

    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            price: this.state.price,
            note: this.state.note
        };
        Axios.put('/api/services/' + this.props.match.params.id, data, {
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
        this.setState({
            isLoad: true
        })
        this.setState({
            isLoad: false
        })

        this._isMounted = true;
        const [services] = await Promise.all([
            Axios.get('/api/services/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);


        if (services !== null) {
            if (this._isMounted) {
                this.setState({
                    name: services.name,
                    price: services.price,
                    note: services.note
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
                            <div onClick={() => this.goBack()} className='subject'> {`<- Sửa thông tin dịch vụ`}</div>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-createnew">Cập nhật</button>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row mt-3">
                            <div className="col">
                                <label htmlFor="name"  >Tên</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Eg. name" value={this.state.name} required={true} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label htmlFor="price"  >Giá</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="price" placeholder="Eg. 100000" value={this.state.price} required={true} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label htmlFor="note"  >Ghi chú</label>
                                <textarea rows="5" onChange={(e) => this.onChange(e)} type="text" className="form-control" name="note" placeholder="Eg. notes" value={this.state.note} required={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default editservices;