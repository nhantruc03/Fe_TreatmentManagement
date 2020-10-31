import React, { Component } from 'react';
import TableDataRow from './tablerow';

class TableData extends Component {

    mappingDataUser = () => this.props.data.map((value, key) => (
        <TableDataRow
            obj={this.props.obj}
            onDelete={(e)=>this.props.onDelete(e)}
            key={key}
            keydata={this.props.keydata}
            data={value}
            review={this.props.review}
            noaction={this.props.noaction}
        />
    ))

    printRow = () =>
        this.props.dataRow.map((value, key) => (
            <th key={key}>{value}</th>
        ))
        
    render() {
        return (
            <div className="col mt-2">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {this.printRow()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.mappingDataUser()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableData;