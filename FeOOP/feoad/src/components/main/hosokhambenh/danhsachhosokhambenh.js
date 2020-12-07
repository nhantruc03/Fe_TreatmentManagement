import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import Pagination from '../Pagination';
import Search from '../search';
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
const tablerow = ['Tên', 'Lý do khám', 'Ngày khám', 'Thao tác']
const keydata = ['patientId.name', 'reason', 'createdAt']
const obj = "patients";
class danhsachhosokhambenh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            SearchData: [],
            type: 'hosokhambenh'
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [medicalrecords] = await trackPromise(Promise.all([
            Axios.post('/api/medical-records/getAll', { patientId: this.props.match.params.id }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));


        console.log(medicalrecords);

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

    goBack = () =>{
        this.props.history.goBack();
    }

    printData = (SearchData) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'>{`<- Danh sách hồ sơ khám bệnh`}</div>
                        </div>
                    </div>
                    <Search target="reason" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData type={this.state.type} obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} />
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

export default danhsachhosokhambenh;