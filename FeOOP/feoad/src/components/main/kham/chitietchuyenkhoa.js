import Axios from 'axios';
import React, { Component } from 'react';
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';
import Image from '../image';
class chitietchuyenkhoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            note: '',
            medical_reason: '',
            result: ''
        }
    }

    async componentDidMount() {
        this.setState({
            isLoad: true
        })
        this.setState({
            isLoad: false
        })

        this._isMounted = true;
        const [medical_record] = await Promise.all([
            Axios.get('/api/medical-details/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);

        if (medical_record !== null) {
            if (this._isMounted) {
                this.setState({
                    images: medical_record.images,
                    note: medical_record.note,
                    medical_reason: medical_record.medical_reason,
                    result: medical_record.result
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
    getImage = () => {
        return (
            this.state.images.map((value, key) => (
                <Image key={key} src={value} />
            ))
        )
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div onClick={this.goBack} className='subject'> {`<- Chi tiết khám chuyên khoa`}</div>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="section">
                                    <li className="fas fa-paper"></li> Kết quả chuyên khoa
                                    </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="medical_reason"  >Lý do làm xét nghiệm</label>
                                        <textarea rows="5" onChange={(e) => this.onChange(e)} type="text" className="form-control" name="medical_reason" placeholder="Eg. medical reason" value={this.state.medical_reason} required={true} readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="result"  >Kết quả làm xét nghiệm</label>
                                        <textarea rows="5" onChange={(e) => this.onChange(e)} type="text" className="form-control" name="result" placeholder="Eg. result" value={this.state.result} required={true} readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="note"  >Ghi chú</label>
                                        <textarea rows="5" onChange={(e) => this.onChange(e)} type="text" className="form-control" name="note" placeholder="Eg. note" value={this.state.note} required={true} readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="images"  >Hình ảnh</label>
                                        <div>
                                            {this.getImage()}
                                        </div>
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

export default chitietchuyenkhoa;