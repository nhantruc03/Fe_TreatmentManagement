import Axios from 'axios';
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { AUTH } from '../../env'
import Pagination from '../Pagination';
import Search from '../search';
import TableData from '../table';
const tablerow = ['Tên', 'Lý do', 'Trạng thái', 'Action']
const keydata = ['patientId.name', 'reason', 'status']
var obj = "departments";


class kham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            SearchData: [],
            type: ''
        }
    }
    async componentDidMount() {
        this._isMounted = true;
        const [queue, this_room, polyclinic] = await Promise.all([
            Axios.get('/api/departments/' + this.props.match.params.id + "/patient-queue", {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/api/departments/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.post('/api/faculties/getAll', { name: "polyclinic" }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);

        if (queue !== null && this_room !== null && polyclinic !== null) {
            if (this._isMounted) {
                if (this_room.facultyId === polyclinic[0]._id) {
                    this.setState({
                        type: 'khamdakhoa'
                    })
                } else {
                    this.setState({
                        type: 'khamchuyenkhoa'
                    })
                }
                this.setState({
                    data: queue[0].queue,
                    SearchData: queue[0].queue
                })
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

    onAddClick = () => {
        this.setState({
            onAdd: true
        })
    }

    onDelete = (e) => {
        this.setState({
            data: this.state.data.filter(o => o._id !== e),
            SearchData: this.state.SearchData.filter(o => o._id !== e)
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
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div className='subject'>Danh sách chờ của phòng khám</div>
                        </div>
                        {/* <div className="col">
                            <div onClick={() => this.onAddClick()} className="btn btn-createnew">+ Register for medical examination</div>
                        </div> */}
                    </div>
                    <Search targetParent="patientId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData type={this.state.type} curRoom={this.props.match.params.id} obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} departmentId={this.props.match.params.id} />
                    <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.getlistpage(SearchData)}
                        paginate={(e) => this.paginate(e)}
                    />
                </div>
            )
        } else {
            return (
                <div className='mt-5'>
                    <h1 className='text-primary mb-3'>Danh sách người dùng</h1>
                    <div onClick={() => this.onAddClick()} className="btn btn-block btn-success"><i className="fa fa-edit" />Thêm</div>
                </div>
            )
        }
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

export default kham;