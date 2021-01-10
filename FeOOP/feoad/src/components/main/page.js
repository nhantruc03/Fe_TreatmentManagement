import React, { Component } from 'react';
// import Footer from './footer';
import Topbar from './topbar';
import { LoadingIndicator } from './Loading';
class page extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="page-top" style={{ height: '100vh' }}>
                    <div id="wrapper" style={{ height: '100%', background: 'white' }}>
                        {/* content wrapper */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            <Topbar />
                            <div style={{paddingTop:'30px'}}>
                                {this.props.children}
                            </div>

                            <LoadingIndicator />
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default page;