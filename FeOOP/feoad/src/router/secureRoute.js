import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const SecureRouteAdmin = ({ component: Component, layout: Layout, ...rest }) => {
  // this.props.history.push(this.props.path)
  return (
    <Route {...rest} render={data => auth.isAuthenticatedAdmin() ? (
      <Layout><Component {...data}></Component></Layout>) :
      (<Redirect to={{ pathname: '/login' }}></Redirect>)}></Route>
  );
};
