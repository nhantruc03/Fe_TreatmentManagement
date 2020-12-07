import React, { Component } from 'react';
// import Footer from './footer';
import Topbar from './topbar';
class page extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="page-top">
                    <div id="wrapper">
                        {/* content wrapper */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            <Topbar />
                         
                
                        </div>
                    </div>
                </div>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default page;