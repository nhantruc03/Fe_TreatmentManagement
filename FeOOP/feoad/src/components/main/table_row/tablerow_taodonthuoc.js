import React, { Component } from 'react';
import { render } from '../service/renderTableRow';

class tablerow_taodonthuoc extends Component {
    addClick = () => {
        this.props.add(this.props.data)
    }

    renderData = () => {
        return (
            render(this.props.keydata, this.props.data)
        )
    }

    renderAction = () => {
        return (
            <td>
                <div className="btn-group">
                    <div onClick={() => this.addClick()} className="btn btn-warning"><i className="fa fa-edit" />Thêm</div>
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

export default tablerow_taodonthuoc;