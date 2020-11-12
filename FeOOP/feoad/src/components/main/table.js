import React, { Component } from 'react';
import TableDataRow from './table_row/tablerow_normal';
import Khamdakhoa from './table_row/tablerow_khamdakhoa'
import Dangkikham from './table_row/tablerow_dangkikham';
import Chonphongkham from './table_row/tablerow_chonphongkham';
import Khamchuyenkhoa from './table_row/tablerow_khamchuyenkhoa';
import Ketquachuyenkhoa from './table_row/tablerow_ketquachuyenkhoa';
import Taodonthuoc from './table_row/tablerow_taodonthuoc';
import Donthuoc from './table_row/tablerow_donthuoc';
import Phongduocsi from './table_row/tablerow_phongduocsi';
import Donthuoctuphongkham from './table_row/tablerow_donthuoctuphongkham';
class TableData extends Component {

    mappingDataUser = () => {
        if (this.props.type === "chonphongkham") {
            return (
                this.props.data.map((value, key) => (
                    <Chonphongkham
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                    />
                ))
            )
        }
        else if (this.props.type === "khamdakhoa") {
            return (
                this.props.data.map((value, key) => (
                    <Khamdakhoa
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                        curRoom={this.props.curRoom}
                        departmentId={this.props.departmentId}
                        onDelete={(e) => this.props.onDelete(e)}
                    />
                ))
            )
        }
        else if (this.props.type === "khamchuyenkhoa") {
            return (
                this.props.data.map((value, key) => (
                    <Khamchuyenkhoa
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                        curRoom={this.props.curRoom}
                        departmentId={this.props.departmentId}
                        onDelete={(e) => this.props.onDelete(e)}
                    />
                ))
            )
        }
        else if (this.props.type === "dangkikham") {
            return (
                this.props.data.map((value, key) => (
                    <Dangkikham
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                    />
                ))
            )
        }
        else if (this.props.type === "ketquachuyenkhoa") {
            return (
                this.props.data.map((value, key) => (
                    <Ketquachuyenkhoa
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                    />
                ))
            )
        }
        else if (this.props.type === "taodonthuoc") {
            return (
                this.props.data.map((value, key) => (
                    <Taodonthuoc
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                        add={(e) => this.props.add(e)}
                    />
                ))
            )
        }
        else if (this.props.type === "donthuoc") {
            return (
                this.props.data.map((value, key) => (
                    <Donthuoc
                        noaction={this.props.noaction}
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                        quantity_change={(e) => this.props.quantity_change(e)}
                        delete={(e) => this.props.delete(e)}
                    />
                ))
            )
        }
        else if (this.props.type === "phongduocsi") {
            return (
                this.props.data.map((value, key) => (
                    <Phongduocsi
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                        quantity_change={(e) => this.props.quantity_change(e)}
                        delete={(e) => this.props.delete(e)}
                    />
                ))
            )
        }
        else if (this.props.type === "donthuoctuphongkham") {
            return (
                this.props.data.map((value, key) => (
                    <Donthuoctuphongkham
                        obj={this.props.obj}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                        quantity_change={(e) => this.props.quantity_change(e)}
                        delete={(e) => this.props.delete(e)}
                    />
                ))
            )
        }
        else {
            return (
                this.props.data.map((value, key) => (
                    <TableDataRow
                        obj={this.props.obj}
                        onDelete={(e) => this.props.onDelete(e)}
                        key={key}
                        keydata={this.props.keydata}
                        data={value}
                        noaction={this.props.noaction}
                    />
                ))
            )
        }
    }

    printRow = () =>
        this.props.dataRow.map((value, key) => (
            <th key={key}>{value}</th>
        ))

    render() {
        return (
            <div className="col mt-2">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            {this.printRow()}
                        </tr>
                    </thead>
                    <tbody >
                        {this.mappingDataUser()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableData;