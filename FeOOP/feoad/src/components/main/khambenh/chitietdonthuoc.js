import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../table';
import { AUTH } from '../../env';
const tablerow = ['Name', 'Unit', 'Quantity', 'Price']
const keydata = ['medicineId.name', 'medicineId.unit', 'quantity', 'medicineId.price']
class chitietdonthuoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            conclude: '',
            type: 'donthuoc',
            name: ''
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [prescription_details, prescriptions] = await Promise.all([
            Axios.post('/api/prescription-details/getAll', { prescriptionId: this.props.match.params.id }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/api/prescriptions/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);
        if (prescription_details !== null && prescriptions !== null) {
            if (this._isMounted) {
                this.setState({
                    data: prescription_details,
                    SearchData: prescription_details,
                    conclude: prescriptions.conclude,
                    name: prescriptions.medicalrecordId.patientId.name
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
                            <div onClick={() => this.goBack()} className='subject'> {`<- Chi tiết đơn thuốc`}</div>
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
                        <div className="col">
                            <label htmlFor="conclude" className='subject'>Kết luận</label>
                            <textarea onChange={(e) => this.onChange(e)} rows='5' type="text" className="form-control" placeholder="Eg. conclude" name="conclude" value={this.state.conclude} readOnly></textarea>
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

export default chitietdonthuoc;