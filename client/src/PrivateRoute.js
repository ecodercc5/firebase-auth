import React from "react";
import { Redirect, Route } from "react-router-dom";
import { firebase } from "./firebase";

export const PrivateRoute = ({ path, component: Component, ...rest }) => {
  const user = firebase.auth().currentUser;

  return (
    <Route
      path={path}
      render={(props) => {
        if (!user) return <Redirect to="/login" />;

        return <Component {...props} />;
      }}
      {...rest}
    />
  );
};
