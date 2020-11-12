import React, { Component } from 'react';

class tablerow_donthuoc extends Component {
    addClick = () => {
        this.props.add(this.props.data)
    }

    Change = (e) => {
        var data = {
            id: this.props.data.medicineId._id,
            quantity: e.target.value
        }
        this.props.quantity_change(data)
    }

    renderData = () => {
        var keydata = this.props.keydata;
        var data = this.props.data;
        return (
            keydata.map((value, key) => {
                if (value.includes('.')) {
                    var list = value.split('.');
                    return <td key={key}>{data[list[0]][list[1]]}</td>

                }
                if (isNaN(data[value])) {
                    return (
                        <td key={key} > { data[value]}</td>
                    )
                }
                else {
                    if (value === 'quantity') {
                        if (this.props.noaction === true) {
                            return (
                                <td key={key} >{data[value]}</td>
                            )
                        }
                        else {
                            return (
                                <td key={key} ><input type="number" onChange={(e) => this.Change(e)} value={data[value]} /></td>
                            )
                        }
                    }
                    else {
                        return (
                            <td key={key} >{data[value]}</td>
                        )
                    }
                }

            })
        )
    }

    delete = () => {
        this.props.delete(this.props.data.medicineId._id);
    }

    renderAction = () => {
        if (this.props.noaction !== true) {
            return (
                <td>
                    <div className="btn-group">
                        <div onClick={() => this.delete()} className="btn btn-warning"><i className="fa fa-edit" />Xóa</div>
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

export default tablerow_donthuoc;