import React, { Component } from 'react';
import Footer from './footer';
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
                            {this.props.children}
                            <Footer />
                        </div>
                    </div>
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up"></i>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

export default page;