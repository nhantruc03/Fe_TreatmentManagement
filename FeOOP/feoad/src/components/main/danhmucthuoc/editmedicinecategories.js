import Axios from 'axios';
import React, { Component } from 'react';
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';
import { trackPromise } from 'react-promise-tracker';

class editmedicinecategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
            name: this.state.name
        };
        await trackPromise(Axios.put('/api/medicine-categories/' + this.props.match.params.id, data, {
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
            }));
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
        const [medicinecategories] = await trackPromise(Promise.all([
            Axios.get('/api/medicine-categories/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));


        if (medicinecategories !== null) {
            if (this._isMounted) {
                this.setState({
                    name: medicinecategories.name
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
                <div className="col-10">
                <div className="container-fluid" style={{paddingLeft: '150px', paddingRight: '150px', paddingBottom:'80px'}}>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Back`}</div>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-createnew">Sửa</button>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="section">
                                    <li className="fas fa-user"></li> Thông tin danh mục thuốc
                                    </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="name"  >Tên</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên danh mục thuốc" value={this.state.name} required={true} />
                                    </div>
                                </div>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </form>
        );
    }
}

export default editmedicinecategories;