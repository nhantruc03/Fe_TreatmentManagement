import React, { Component } from 'react';

class Search extends Component {
    onChange = (e) => {
        var ketqua = [];
        if (this.props.data != null) {
            this.props.data.forEach((item) => {
                if (this.props.targetParent == null) {
                    if (item[this.props.target].toString().toLowerCase().indexOf(e.target.value) !== -1) {
                        ketqua.push(item);
                    }
                }
                else {
                    if (item[this.props.targetParent][this.props.target].toString().toLowerCase().indexOf(e.target.value) !== -1) {
                        ketqua.push(item);
                    }
                }
            })
        }
        this.props.getSearchData(ketqua)
    }
    render() {
        return (
            <input onChange={(e) => this.onChange(e)} name="search" id="search" className="form-control search input-field mt-4" type="text" placeholder="Tìm kiếm" ></input>
        );
    }
}

export default Search;