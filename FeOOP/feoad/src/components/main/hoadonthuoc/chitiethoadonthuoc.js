import Axios from 'axios';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { trackPromise } from 'react-promise-tracker';
import { AUTH } from '../../env'
import TableData from '../table';
const tablerow = ['Name', 'Unit', 'Quantity', 'Price']
const keydata = ['medicineId.name', 'medicineId.unit', 'quantity', 'medicineId.price']
class chitiethoadonthuoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            conclude: '',
            type: 'donthuoc',
            total: 0
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [prescription_bill_details, prescription_bills] = await trackPromise(Promise.all([
            Axios.post('/api/prescription-bill-details/getAll', { prescriptionbillId: this.props.match.params.id }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/api/prescription-bills/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));
        if (prescription_bill_details !== null && prescription_bills !== null) {
            if (this._isMounted) {
                console.log(prescription_bill_details)
                this.setState({
                    data: prescription_bill_details,
                    SearchData: prescription_bill_details,
                    conclude: prescription_bills.conclude
                })

                prescription_bill_details.forEach((value) => {
                    this.setState({
                        total: this.state.total + (value.medicineId.price * value.quantity)
                    })
                })
            }
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    goBack = () => {
        this.props.history.goBack();
    }

    printData = (data) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1'>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Quay về`}</div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <TableData
                            noaction={true}
                            dataRow={tablerow}
                            data={data}
                            keydata={keydata}
                            type={this.state.type}
                        />
                    </div>
                    <div className="row">
                        

                    </div>
                    <div className="row">
                        <div className="col-9">
                            <label htmlFor="conclude" className='subject'>Kết luận</label>
                            <textarea onChange={(e) => this.onChange(e)} rows='5' type="text" className="form-control" placeholder="Eg. conclude" name="conclude" value={this.state.conclude} readOnly></textarea>
                        </div>
                        <div className="col-3">
                            <label style={{marginTop:'140px'}} htmlFor="total" className='subject'>Tổng cộng:  <NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} /> vnđ</label>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div className='mt-5'>
                    <h1 className='text-primary mb-3'>Đơn thuốc</h1>
                </div>
            )
        }
    }
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {this.printData(this.state.data)}
                    </div>
                </div>
            </div>
        );
    }
}

export default chitiethoadonthuoc;