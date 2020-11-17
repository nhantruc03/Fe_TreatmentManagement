import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from '../service/renderTableRow';

class tablerow_hosobenhnhan extends Component {
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
                        <Link className="link" to={`/danhsachhosokhambenh/${this.props.data._id}`} >
                            <div className="btn btn-warning"><i className="fa fa-edit" />Xem hồ sơ khám bệnh</div>
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

export default tablerow_hosobenhnhan;