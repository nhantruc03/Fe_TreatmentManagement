import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import Pagination from '../Pagination';
import { Redirect } from 'react-router-dom';
import Search from '../search';
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
const tablerow = ['Tên', 'Khoa', 'Điện thoại', 'Phòng', 'Tầng', 'Ghi chú', 'Trạng thái', 'Thao tác']
const keydata = ['name', 'facultyId.name', 'phoneNumber', 'room', 'floor', 'note', 'isDeleted']
const obj = "doctor_listdepartments"

class doctor_listdepartments extends Component {
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
        const [departments] = await trackPromise(Promise.all([
            Axios.post('/api/departments/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));


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
                            <div className='subject'>Danh sách phòng</div>
                        </div>
                    </div>
                    <Search target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData
                        redirectUrl="doctor_listdepartments"
                        obj={obj} dataRow={tablerow}
                        data={this.getCurData(SearchData)}
                        keydata={keydata}
                        type="chonphongkham"
                    />
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
                    <h1 className='text-primary mb-3'>Danh sách phòng</h1>
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
export default doctor_listdepartments;