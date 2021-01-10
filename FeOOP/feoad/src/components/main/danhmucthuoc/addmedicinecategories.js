import Axios from 'axios';
import React, { Component } from 'react';
import { AUTH } from '../../env';
import { trackPromise } from 'react-promise-tracker';
class addmedicinecategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
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
        console.log(data)
        await trackPromise(Axios.post('/api/medicine-categories', data, {
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
            }))
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid" style={{paddingLeft: '150px', paddingRight: '150px', paddingBottom:'80px'}}>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Back`}</div>
                        </div>
                        <div className="col" style={{paddingRight:'24px'}}>
                            <button type="submit" className="btn btn-createnew">Tạo mới</button>
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
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên danh mục thuốc" required={true} />
                                    </div>
                                </div>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default addmedicinecategories;