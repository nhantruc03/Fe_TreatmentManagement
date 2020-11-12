import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { render } from '../service/renderTableRow';
import { AUTH } from '../../env';
class tablerow_khamdakhoa extends Component {
    deleteClick = () => {
        Axios.delete(this.props.deleteUrl)
            .then((res) => {
                console.log(res.data);
            })
        this.props.onDelete(this.props.data._id);
    }

    renderData = () => {
        return (
            render(this.props.keydata, this.props.data)
        )
    }

    onComplete = async () => {
        await Axios.delete('/departments/' + this.props.departmentId + '/remove-patient/' + this.props.data._id, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

        this.props.onDelete(this.props.data._id);
    }

    renderAction = () => {
        return (
            <td>
                <div className="btn-group">
                    <Link className="link" to={`/khamdakhoa/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Xem</div>
                    </Link>
                    <Link className="link" to={`/khamdakhoa/danhsachketquachuyenkhoa/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Danh sách kết quả chuyên khoa</div>
                    </Link>
                    <Link className="link" to={`/khamdakhoa/taodonthuoc/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Tạo đơn thuốc</div>
                    </Link>
                    <Link className="link" to={`/xemdonthuoc/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Xem đơn thuốc</div>
                    </Link>
                    <div onClick={() => this.onComplete()} className="btn btn-warning"><i className="fa fa-edit" />Hoàn thành khám bệnh</div>
                </div>
            </td>
        )
    }

    render() {
        return (
            <tr style={{ textAlign: "center" }}>
                { this.renderData()}
                {this.renderAction()}
            </tr >
        );
    }
}

export default tablerow_khamdakhoa;