import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from '../service/renderTableRow';

class tablerow_hoadonthuoc extends Component {
    renderData = () => {
        return (
            render(this.props.keydata, this.props.data)
        )
    }

    renderAction = () => {
        if (this.props.noaction) {

        } else {
            return (
                <td>
                    <div className="btn-group">
                        <Link className="link" to={`/xemdonthuoc/chitietdonthuoc/${this.props.data.prescriptionId._id}`} >
                            <div className="btn btn-warning"><i className="fa fa-edit" />Xem Đơn thuốc</div>
                        </Link>
                        <Link className="link" to={`/xemhoadonthuoc/chitiethoadonthuoc/${this.props.data._id}`} >
                            <div className="btn btn-warning"><i className="fa fa-edit" />Xem Hóa đơn thuốc</div>
                        </Link>
                    </div>
                </td>
            )
        }
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

export default tablerow_hoadonthuoc;