import React from "react";
import { Redirect, Route } from "react-router-dom";
import { firebase } from "./firebase";

export const PublicRoute = ({ path, component: Component, ...rest }) => {
  const user = firebase.auth().currentUser;

  console.log({ currentUser: user });

  return (
    <Route
      path={path}
      render={(props) => {
        if (user) return <Redirect to="/dashboard" />;

        return <Component {...props} />;
      }}
      {...rest}
    />
  );
};
