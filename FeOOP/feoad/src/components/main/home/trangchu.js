import React, { Component } from 'react';

class trangchu extends Component {
    async componentDidMount() {
        this._isMounted = true;
        this.props.history.push("/");
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default trangchu;