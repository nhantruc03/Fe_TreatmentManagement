import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import Pagination from '../Pagination';
import Search from '../search';
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
const tablerow = ['Ngày bán','Mã thuốc','Tên thuốc','Nhà sản xuất','Đơn vị tính','Số lượng']
const keydata = ['createdAt','medicineId._id','medicineId.name','medicineId.brand','medicineId.unit','quantity']

class sobanthuoc extends Component {
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
        const [bill_details] = await trackPromise(Promise.all([
            Axios.post('/api/prescription-bill-details/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));
        console.log(bill_details)
        if (bill_details !== null) {
            if (this._isMounted) {
                this.setState({
                    data: bill_details,
                    SearchData: bill_details
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
                            <div className='subject'>Sổ bán thuốc</div>
                        </div>
                    </div>
                    <Search targetParent="medicineId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData noaction={true} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} />
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
                    <h1 className='text-primary mb-3'>Sổ bán thuốc</h1>
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

export default sobanthuoc;