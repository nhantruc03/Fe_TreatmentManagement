import Axios from 'axios';
import React, { Component } from 'react';
import { AUTH } from '../../env'
import 'react-day-picker/lib/style.css';
import Search from '../search';
import TableData from '../table';
import Pagination from '../Pagination';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

const tablerow = ['Name', 'Note', 'Price']
const keydata = ['serviceId.name', 'note', 'serviceId.price']
const obj = "departments";

class xemhoadon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 10,
            SearchData: [],
            total: 0
        }
    }
    getlistpage = (SearchData) => {
        var listpage = [];
        for (let i = 1; i <= Math.ceil(SearchData.length / this.state.postsPerPage); i++) {
            listpage.push(i);
        }
        return listpage;
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

    async componentDidMount() {
        this._isMounted = true;
        var data = {
            medicalrecordId: [this.props.match.params.id]
        };
        var curBill = await trackPromise(
            Axios.post('/api/medical-bills/getAll', data, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then(res => {
                    if (res.data.data.length > 0) {
                        return (
                            res.data.data[0]._id
                        )
                    } else {
                        return undefined
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        )

        if (curBill !== undefined) {
            data = {
                medicalBillId: curBill
            }
            await trackPromise(Axios.post('/api/medical-bill-details/getAll', data, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then(res => {
                    this.setState({
                        data: res.data.data,
                        SearchData: res.data.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            )
            this.state.data.forEach((value) => {
                this.setState({
                    total: this.state.total + value.serviceId.price
                })
            })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    goBack = () => {
        this.props.history.goBack();
    }
    printData = (SearchData) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={this.goBack} className='subject'> {`<- Hóa đơn`}</div>
                        </div>
                        <div className="col">
                            <Link className="link" to={`/dangkidichvu/${this.props.match.params.id}`} >
                                <div className="btn btn-createnew"><i className="fa fa-edit" />+ Đăng kí dịch vụ</div>
                            </Link>
                        </div>
                    </div>
                    <Search targetParent="serviceId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} noaction />
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
                    <div className="mt-3 text-center">
                        <strong>Total: <NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'đ'} /></strong>
                    </div>
                </div>

            </div>
        );
    }
}

export default xemhoadon;