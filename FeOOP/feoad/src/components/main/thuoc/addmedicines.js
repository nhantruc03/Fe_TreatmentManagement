import Axios from 'axios';
import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import Select from 'react-select';
import { AUTH } from '../../env'
import { Message } from '../service/renderMessage';
class addmedicines extends Component {
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

    onSubmit = async (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            price:this.state.price,
            quantity: this.state.quantity,
            unit: this.state.unit,
            brand: this.state.brand,
            medicinecategoriesId: this.state.medicinecategoriesId
        };
        console.log(data)
        await trackPromise(Axios.post('/api/medicines', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                Message('Tạo thành công', true,this.props); 
            })
            .catch(err => {
                Message('Tạo thất bại', false); 
            }))
    }

    goBack = () => {
        this.props.history.goBack();
    }

    async componentDidMount() {
        this.setState({
            isLoad: true
        })
        this.setState({
            isLoad: false
        })

        this._isMounted = true;
        const [medicinecategories] = await trackPromise(Promise.all([
            Axios.post('/api/medicine-categories/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));


        if (medicinecategories !== null) {
            if (this._isMounted) {
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

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid" style={{paddingLeft: '150px', paddingRight: '150px', paddingBottom:'80px'}}>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={() => this.goBack()} className='subject'> {`<- Tạo thuốc`}</div>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-createnew">Tạo mới</button>
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
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên thuốc" required={true} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="price"  >Giá</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="price" placeholder="Giá" required={true} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="quantity"  >Số lượng</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="quantity" placeholder="Số lượng" required={true} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="unit"  >Đơn vị tính</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="unit" placeholder="Đơn vị tính" required={true} />
                                    </div>
                                </div>
                                
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor="brand"  >Hãng sản xuất</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="brand" placeholder="Hãng sản xuất" required={true} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="medicinecategoriesId"  >Danh mục thuốc</label>
                                        <Select
                                            onChange={(e) => this.onSelectMedicineCategories(e)}
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

export default addmedicines;