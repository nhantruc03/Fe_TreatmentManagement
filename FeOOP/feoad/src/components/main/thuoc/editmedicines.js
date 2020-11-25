import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { AUTH } from '../../env'

class editmedicines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            price: '',
            quantity: '',
            unit: '',
            list_medicinecategories: [],
            medicinecategoriesId: '',
            isDone: false
        }
    }

    onSelectMedicineCategories = (e) => {
        this.setState({
            medicinecategoriesId: e.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            unit: this.state.unit,
            brand: this.state.brand,
            medicinecategoriesId: this.state.medicinecategoriesId
        };
        Axios.put('/api/medicines/' + this.props.match.params.id, data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res);
                this.goBack();
            })
            .catch(err => {
                console.log(err);
            })
    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    async componentDidMount() {
        this.setState({
            isLoad: true
        })
        this.setState({
            isLoad: false
        })

        this._isMounted = true;
        const [medicines, medicinecategories] = await Promise.all([
            Axios.get('/api/medicines/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.post('/api/medicine-categories/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]);


        if (medicines !== null && medicinecategories !== null) {
            if (this._isMounted) {
                this.setState({
                    name: medicines.name,
                    price: medicines.price,
                    quantity: medicines.quantity,
                    brand: medicines.brand,
                    unit: medicines.unit,
                    medicinecategoriesId: medicines.medicinecategoriesId._id
                })
                var temp = [];
                medicinecategories.forEach(e => {
                    var o = {
                        value: e._id,
                        label: e.name
                    };
                    temp.push(o);
                })
                this.setState({
                    list_medicinecategories: temp
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
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Sửa thông tin thuốc`}</div>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-createnew">Sửa</button>
                        </div>
                    </div>

                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="section">
                                    <li className="fas fa-user"></li> Thông tin thuốc
                                    </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="name"  >Tên</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên thuốc" value={this.state.name} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="price"  >Giá</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="price" placeholder="Giá" value={this.state.price} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="quantity"  >Số lượng</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="quantity" placeholder="Số lượng" value={this.state.quantity} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="unit"  >Đơn vị tính</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="unit" placeholder="Đơn vị tính" value={this.state.unit} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="brand"  >Hãng sản xuất</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="brand" placeholder="Hãng sản xuất" value={this.state.brand} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="mt-3" htmlFor="medicinecategoriesId"  >Danh mục thuốc</label>
                                        <Select
                                            onChange={(e) => this.onSelectMedicineCategories(e)}
                                            value={this.state.list_medicinecategories.filter(({ value }) => value === this.state.medicinecategoriesId)}
                                            options={this.state.list_medicinecategories}
                                        />
                                    </div>
                                </div>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default editmedicines;