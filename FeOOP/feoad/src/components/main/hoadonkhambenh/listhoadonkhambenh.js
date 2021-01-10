import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH } from '../../env'
import Pagination from '../Pagination';
import Search from '../search';
import TableData from '../table';
import { trackPromise } from 'react-promise-tracker';
const tablerow = ['Tên', 'Lý do', 'Action']
const keydata = ['patientId.name', 'reason']
const obj = "departments";
class listhoadonkhambenh extends Component {
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


        const medicalrecords = await trackPromise(
            Axios.post('/api/medical-records/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            }).then((res) =>

                res.data.data
            )

        );

        if (medicalrecords !== null) {
            if (this._isMounted) {
                this.setState({
                    data: medicalrecords,
                    SearchData: medicalrecords
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
                    <TableData type="hoadonkham" obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} home={true} />
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

export default listhoadonkhambenh;