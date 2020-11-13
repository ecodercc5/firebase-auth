import React from "react";
import { Link } from "react-router-dom";
import { firebase } from "./firebase";

export const Layout = ({ children }) => {
  const user = firebase.auth().currentUser;

  return (
    <div>
      <nav>
        <ul>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : null}
          {user ? (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : null}
        </ul>
      </nav>
      {children}
    </div>
  );
};
