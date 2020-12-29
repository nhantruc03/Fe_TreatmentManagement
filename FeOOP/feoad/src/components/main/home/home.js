import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH } from '../../env'
import Pagination from '../Pagination';
import Search from '../search';
import TableData from '../table';
import { trackPromise } from 'react-promise-tracker';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const tablerow = ['Tên', 'Lý do', 'Trạng thái', 'Action']
const keydata = ['patientId.name', 'reason', 'status']
const obj = "departments";
const client = new W3CWebSocket('ws://localhost:3001');
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 6,
            listPage: [],
            SearchData: [],
            min_departmentId: ''
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        // websocket - realtime section

        client.onopen = () => {
            console.log('Connect to ws')
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer.type === "REMOVE") {
                this.setState({
                    data: this.state.data.filter(o => o._id !== dataFromServer.id),
                    SearchData: this.state.SearchData.filter(o => o._id !== dataFromServer.id)
                })
            }

        };
        // end - realtime section

        this.props.history.push("/home");
        const polyclinic = await trackPromise(
            Axios.post('/api/faculties/getAll', { name: "polyclinic" }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        )
        if (polyclinic !== undefined) {
            const departments = await trackPromise(
                Axios.post('/api/departments/getAll', { facultyId: polyclinic[0]._id }, {
                    headers: {
                        'Authorization': { AUTH }.AUTH
                    }
                }).then((res) =>

                    res.data.data
                )

            );
            var temp_data = [];
            var min_index = 9999;
            var min_department = '';

            departments.forEach((queues) => {
                if (queues.queue.length < min_index) {
                    min_index = queues.queue.length;
                    min_department = queues._id;
                }
                queues.queue.forEach((patient) => {
                    temp_data.push(patient);
                })
            })

            if (departments !== null) {
                if (this._isMounted) {
                    this.setState({
                        data: temp_data,
                        SearchData: temp_data,
                        min_departmentId: min_department
                    })
                }
                console.log(this.state.data)
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    getCurData = (SearchData) => {
        var indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        return SearchData.slice(indexOfFirstPost, indexOfLastPost);

    }

    getSearchData = (data) => {
        this.setState({
            SearchData: data
        })
    }

    paginate = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber
            });
    }
    onDelete = (e) => {
        this.setState({
            data: this.state.data.filter(o => o._id !== e)
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getlistpage = (SearchData) => {
        var listpage = [];
        for (let i = 1; i <= Math.ceil(SearchData.length / this.state.postsPerPage); i++) {
            listpage.push(i);
        }
        return listpage;
    }
    printData = (SearchData) => {
        return (
            <div className='mt-1' style={{ paddingBottom: '20px' }}>
                <div className="row">
                    <div className="col-9">
                        <div className='subject'>Trang đăng kí khám bệnh</div>
                    </div>
                    <div className="col">
                        <Link className="link" to={`/register_medical/${this.state.min_departmentId}`} >
                            <div className="btn btn-createnew">+ Tạo mới phiếu khám bệnh</div>
                        </Link>
                    </div>
                </div>
                <Search targetParent="patientId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                <div className='mt-2'>
                        <TableData type="dangkikham" obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} home={true} />
                  

                </div>
                <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.getlistpage(SearchData)}
                    paginate={(e) => this.paginate(e)}
                />
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    {this.printData(this.state.SearchData)}
                </div>
            </div>
        );
    }
}

export default home;