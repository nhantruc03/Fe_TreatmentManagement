import React, { Component } from 'react';
// import Footer from './footer';
import Topbar from './topbar';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress &&
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" height="100" width="100" />
      </div>
    )
  }
import {LoadingIndicator} from './Loading';
class page extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="page-top" style={{height:'100vh'}}>
                    <div id="wrapper" style={{height:'100%'}}>
                <div id="page-top" style={{height:'100vh'}}>
                    <div id="wrapper" style={{height:'100%', background:'white'}}>
                        {/* content wrapper */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            <Topbar />
                            {this.props.children}
                            <LoadingIndicator />
                            <LoadingIndicator/>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default page;