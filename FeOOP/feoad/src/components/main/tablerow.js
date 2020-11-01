import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
class TableDataRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onEdit: false,
            onView: false
        }
    }

    editClick = () => {
        this.setState({
            onEdit: !this.state.onEdit
        })
    }

    deleteClick = () => {
        Axios.delete('/' + this.props.obj + '/' + this.props.data._id)
            .then((res) => {
                console.log(res.data);
            })
        this.props.onDelete(this.props.data._id);
    }

    renderData = () =>
        this.props.keydata.map((value, key) => {
            if (value === "isDeleted") {
                var stt;
                if (this.props.data[value] === true) {
                    stt = "Disable";
                    return (
                        <td key={key} ><div className="disable">{stt}</div> </td>
                    )
                }
                else {
                    stt = "Enable";
                    return (
                        <td key={key} ><div className="enable">{stt}</div> </td>
                    )
                }
            }
            if (value.includes('Id')) {
                return <td key={key}>{this.props.data[value].name}</td>
            }
            if (this.props.data[value]) {
                if (isNaN(this.props.data[value])) {
                    if (this.props.data[value].includes("image")) {
                        return (
                            <td key={key} ><img style={{ width: 150 }} src={`/anh/${this.props.data[value]}`} alt="Logo" /> </td>
                        )
                    }
                    else {
                        return (
                            <td key={key} > { this.props.data[value]}</td>
                        )
                    }
                }
                else {
                    return (
                        <td key={key} > { this.props.data[value]}</td>
                    )
                }
            }
            else {
                return <td key={key}>null</td>;
            }
        })

    viewClick = () => {
        this.setState({
            onView: true
        })
    }
    renderAction = () => {
        if (this.props.noaction) {
            
        } else {
            if (this.props.review) {
                return (
                    <td>
                        <div className="btn-group">
                            <div onClick={() => this.viewClick()} className="btn btn-warning"><i className="fa fa-edit" />Xem</div>
                            <div onClick={() => this.deleteClick()} className="btn btn-danger xoa"> <i className="fa fa-minus" />Xóa</div>
                        </div>
                    </td>
                )
            } else {
                return (
                    <td>
                        <div className="btn-group">
                            <div onClick={() => this.editClick()} className="btn btn-warning"><i className="fa fa-edit" />Sửa</div>
                            <div onClick={() => this.deleteClick()} className="btn btn-danger xoa"> <i className="fa fa-minus" />Xóa</div>
                        </div>
                    </td>
                )
            }
        }
    }

    render() {
        if (this.state.onEdit) {
            return (
                <Redirect to={"/edit" + this.props.obj + "/" + this.props.data._id} />
            )
        }
        else if (this.state.onView) {
            return (
                <Redirect to={"/" + this.props.obj + "/" + this.props.data._id} />
            )
        }
        else {
            return (

                <tr>
                    { this.renderData()}

                    {this.renderAction()}

                </tr >
            );
        }
    }
}

export default TableDataRow;