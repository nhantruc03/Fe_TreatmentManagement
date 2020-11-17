import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH } from '../../env'
import Pagination from '../Pagination';
import Search from '../search';
import TableData from '../table';
const tablerow = ['Tên', 'Lý do', 'Trạng thái', 'Action']
const keydata = ['patientId.name', 'reason', 'status']
const obj = "departments";

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            SearchData: [],
            min_departmentId: '',
            isload: true
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this.props.history.push("/home");
        const [polyclinic] = await Promise.all([
            Axios.post('/api/faculties/getAll', { name: "polyclinic" }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ])
        if (polyclinic !== undefined) {
            const [departments] = await Promise.all([
                Axios.post('/api/departments/getAll', { facultyId: polyclinic[0]._id }, {
                    headers: {
                        'Authorization': { AUTH }.AUTH
                    }
                })
                    .then((res) =>
                        res.data.data
                    )
            ]);

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
                        min_departmentId: min_department,
                        isload: false
                    })
                }
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
            <div className='mt-1'>
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
                <TableData type="dangkikham" obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} home={true} />
                <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.getlistpage(SearchData)}
                    paginate={(e) => this.paginate(e)}
                />
            </div>
        )
    }
    render() {
        if (this.state.isload) {
            return <p>loading ...</p>
        }
        else {
            return (
                <div>
                    <div className="container-fluid">
                        {this.printData(this.state.SearchData)}
                    </div>
                </div>
            );
        }
    }
}

export default home;