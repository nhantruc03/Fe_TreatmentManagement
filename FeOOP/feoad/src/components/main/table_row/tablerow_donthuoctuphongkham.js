import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from '../service/renderTableRow';
class tablerow_donthuoctuphongkham extends Component {
    renderData = () => {
        return (
            render(this.props.keydata, this.props.data)
        )
    }

    renderAction = () => {
        return (
            <td>
                <Link className="link" to={`/xemdonthuocbs/chitietdonthuoc/${this.props.data._id}`} >
                    <div className="btn btn-warning"><i className="fa fa-edit" />Xem Đơn thuốc</div>
                </Link>
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

export default tablerow_donthuoctuphongkham;