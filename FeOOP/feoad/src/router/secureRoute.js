import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const SecureRouteAdmin = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route {...rest} render={data => auth.isAuthenticatedAdmin() ? (
      <Layout><Component {...data}></Component></Layout>) :
      (auth.isAuthenticatedStaff() ? (
        <Redirect to={{ pathname: '/khongcoquyen' }}></Redirect>) :
        (<Redirect to={{ pathname: '/login' }}></Redirect>))}></Route >
  );
};
