import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from '../service/renderTableRow'
import Tooltip from '@material-ui/core/Tooltip';

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
                    <Tooltip title="Vào phòng" arrow>
                    <Link className="link" to={`/${this.props.obj}/${this.props.data._id}`} >
                        <div className="btn btn-warning" style={{backgroundColor: "#2997ff"  }}><i className="fas fa-door-open" /></div>
                    </Link>
                    </Tooltip>
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