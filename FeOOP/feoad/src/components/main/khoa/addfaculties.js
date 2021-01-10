import Axios from 'axios';
import React, { Component } from 'react';
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';
import { trackPromise } from 'react-promise-tracker';

class addfaculties extends Component {
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
        console.log(data)
        await trackPromise(Axios.post('/api/falcuties', data, {
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
                            <div className="col-12">
                                <div className="row mt-3">
                                    <label htmlFor="name"  >Tên</label>
                                    <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Eg. name" required={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default addfaculties;