import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from '../service/renderTableRow'
class tablerow_chonphongkham extends Component {
    renderData = () => {
        return (
            render(this.props.keydata, this.props.data)
        )
    }

    renderAction = () => {
        return (
            <td>
                <div className="btn-group">
                    <Link className="link" to={`/${this.props.obj}/${this.props.data._id}`} >
                        <div className="btn btn-warning"><i className="fa fa-edit" />Go in</div>
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

export default tablerow_chonphongkham;