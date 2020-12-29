import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from '../service/renderTableRow';
class tablerow_dangkikham extends Component {
    renderData = () => {
        return (
            render(this.props.keydata, this.props.data)
        )
    }

    renderAction = () => {
        return (
            <td>
                <div className="btn-group">
                    <Link className="link" to={`/dangkikhamchuyenkhoa/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Đăng kí khám chuyên khoa</div>
                    </Link>
                    <Link className="link" to={`/dangkidichvu/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Đăng kí dịch vụ</div>
                    </Link>
                    <Link className="link" to={`/xemhoadon/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Xem hoa đơn</div>
                    </Link>
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

export default tablerow_dangkikham;