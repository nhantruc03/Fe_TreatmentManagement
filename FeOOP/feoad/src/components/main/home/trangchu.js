import React, { Component } from 'react';


class trangchu extends Component {
    async componentDidMount() {
        this._isMounted = true;
        this.props.history.push("/trangchu");
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <div style={{height:'100%'}}>
               <img src="/Home.png" alt="Home" style={{ maxWidth:'100%'}}></img>
            </div>
        );
    }
}

export default trangchu;