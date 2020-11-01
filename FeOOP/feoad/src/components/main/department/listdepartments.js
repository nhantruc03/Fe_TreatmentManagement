import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import Pagination from '../Pagination';
import { Redirect } from 'react-router-dom';
import Search from '../search';
import { AUTH } from '../../env'
const tablerow = ['Name', 'Faculty', 'Phone','Room', 'Floor', 'Note/remark', 'Status', 'Thao tác']
const keydata = ['name', 'facultyId', 'phoneNumber','room', 'floor','note', 'isDeleted']
const obj = "departments"

class listdepartments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            SearchData: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [departments] = await Promise.all([
            Axios.get('/departments', {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);


        if (departments !== null) {
            if (this._isMounted) {
                this.setState({
                    data: departments,
                    SearchData: departments
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
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div className='subject'>List of users</div>
                        </div>
                        <div className="col">
                            <div onClick={() => this.onAddClick()} className="btn btn-createnew">+ Create new</div>
                        </div>
                    </div>
                    <Search target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} />
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
        if (!this.state.onAdd) {
            return (
                <div>
                    <div className="container-fluid">
                        {this.printData(this.state.SearchData)}
                    </div>
                </div>
            );
        }
        else {
            return (
                <Redirect to={"/adddepartments"} />
            )
        }
    }
}
export default listdepartments;