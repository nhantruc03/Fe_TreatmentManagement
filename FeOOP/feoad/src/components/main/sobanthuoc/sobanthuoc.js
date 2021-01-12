import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import Pagination from '../Pagination';
import Search from '../search';
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
import NumberFormat from 'react-number-format';
const tablerow = ['Ngày bán', 'Mã thuốc', 'Tên thuốc', 'Nhà sản xuất', 'Đơn vị tính', 'Đơn giá', 'Số lượng']
const keydata = ['createdAt', 'medicineId._id', 'medicineId.name', 'medicineId.brand', 'medicineId.unit', 'medicineId.price', 'quantity']

class sobanthuoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            ReportData: null,
            SearchData: null,
            total: 0,
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            day: '',
            month: '',
            year: ''
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


        if (bill_details !== null) {
            if (this._isMounted) {
                console.log(bill_details)
                var temp = bill_details.reduce((prev, cur) => {

                    const index = prev.findIndex(v => (v.medicineId._id === cur.medicineId._id && v.price === cur.price
                        && new Date(v.createdAt).getDate() === new Date(cur.createdAt).getDate()
                        && new Date(v.createdAt).getMonth() === new Date(cur.createdAt).getMonth()
                        && new Date(v.createdAt).getFullYear() === new Date(cur.createdAt).getFullYear()));
                    if (index === -1) {
                        prev.push(cur);
                    } else {
                        prev[index].quantity = Number(prev[index].quantity) + Number(cur.quantity);
                    }
                    return prev;
                }, [])

                this.setState({
                    data: temp,
                    SearchData: temp,
                    ReportData: temp
                })
                this.getTotal();
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

    Report = () => {
        var data = [];
        this.state.data.forEach(e => {
            var temp = new Date(e.createdAt);
            if (this.state.day !== '') {
                if (this.state.month !== '' && this.state.year !== '') {
                    if (temp.getDate() === Number(this.state.day) && temp.getMonth() + 1 === Number(this.state.month) && temp.getFullYear() === Number(this.state.year)) {
                        data.push(e);
                    }
                }
                else if (this.state.month !== '') {
                    if (temp.getDate() === Number(this.state.day) && temp.getMonth() + 1 === Number(this.state.month)) {
                        data.push(e);
                    }
                }
                else if (this.state.year !== '') {
                    if (temp.getDate() === Number(this.state.day) && temp.getFullYear() === Number(this.state.year)) {
                        data.push(e);
                    }
                } else {
                    if (temp.getDate() === Number(this.state.day)) {
                        data.push(e);
                    }
                }
            }
            else if (this.state.month !== '') {
                if (this.state.year !== '') {
                    if (Number(this.state.month) === temp.getMonth() + 1 && Number(this.state.year) === temp.getFullYear()) {
                        data.push(e)
                    }
                }
                else {
                    if (Number(this.state.month) === temp.getMonth() + 1) {
                        data.push(e)
                    }
                }
            }
            else if (this.state.year !== '') {
                if (Number(this.state.year) === temp.getFullYear()) {
                    data.push(e)
                }
            }
        })

        if (this.state.day === '' && this.state.month === '' && this.state.year === '') {
            this.setState({
                ReportData: this.state.data,
                SearchData: this.state.data
            }, () => {
                this.getTotal();
            })
        } else {
            this.setState({
                ReportData: data,
                SearchData: data
            }, () => {
                this.getTotal();
            })
        }

    }

    printData = (SearchData) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-6">
                            <div className='subject'>Sổ bán thuốc</div>
                        </div>
                        
                    </div>
                    
                    <div className="row">
                    <div className="col-6">
                    <Search targetParent="medicineId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} /></div>
                    <div className="col">{this.renderTotal()}</div>
                    </div>
                    <TableData noaction={true} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} />
                    <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.getlistpage(SearchData)}
                        paginate={(e) => this.paginate(e)}
                    />
                   <div className="row">
                        <div className="col-6">
                            <div className='subject'>Báo cáo</div>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-3">
                            <input className='form-control' onChange={(e) => this.onChange(e)} type="number" name="day" min="1" max="31" placeholder="Ngày" style={{marginLeft:'20px'}}></input>
                        </div>
                        <div className="col-3">
                            <input className='form-control' onChange={(e) => this.onChange(e)} type="number" name="month" min="1" max="12" placeholder="Tháng"style={{marginLeft:'20px'}}></input>
                        </div>
                        <div className="col-3">
                            <input className='form-control' onChange={(e) => this.onChange(e)} type="number" name="year" min="1" placeholder="Năm"style={{marginLeft:'20px'}}></input>
                        </div>
                        <div className="col-3">
                            <button onClick={this.Report} className="btn btn-success form-control" >Xem báo cáo</button>
                        </div>

                    </div>
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
    getTotal = () => {
        var total = 0;
        this.state.SearchData.forEach(o => {
            total += o.medicineId.price * o.quantity;
        });
        this.setState({
            total: total
        })
    }

    renderTotal = () => {
        return (
            <p style={{ fontSize: '2rem', textAlign: "right",marginBottom:"0" }}>Tổng tiền: <NumberFormat style={{ fontSize: '2rem' }} value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'đ'} /></p>
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

export default sobanthuoc;