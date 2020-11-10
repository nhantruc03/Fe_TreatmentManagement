import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import Pagination from '../Pagination';
import Search from '../search';
import { AUTH } from '../../env'
import { Link } from 'react-router-dom';
const tablerow = ['Tên bệnh nhân', 'Kết luận', 'Tên bác sĩ', 'Ngày tạo', 'Thao tác']
const keydata = ['medicalrecordId.name', 'conclude', 'doctorId.name', 'createdAt']

class phongduocsi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            SearchData: [],
            type: 'phongduocsi'
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [prescriptions] = await Promise.all([
            Axios.post('/prescriptions/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);


        if (prescriptions !== null) {
            if (this._isMounted) {
                prescriptions.forEach((value) => {
                    value.medicalrecordId = value.medicalrecordId.patientId
                })
                this.setState({
                    data: prescriptions,
                    SearchData: prescriptions
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
                            <div className='subject'>Phòng dược sĩ</div>
                        </div>
                        <div className="col">
                            <Link className="link" to={`/taodonthuoctudo`} >
                                <div className="btn btn-createnew"><i className="fa fa-edit" />+ Create new</div>
                            </Link>
                        </div>
                    </div>
                    <Search targetParent="medicalrecordId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData type={this.state.type} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} />
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

export default phongduocsi;