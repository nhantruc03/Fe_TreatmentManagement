import React, { Component } from 'react';

class image extends Component {
    render() {
        return (
            <div style={{display: "inline-block"}}>
                <img src={`/images/${this.props.src}`} alt="ảnh đại diện" />
            </div>
        );
    }
}

export default image;