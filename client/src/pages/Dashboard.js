import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { Layout } from "../Layout";
import { firebase } from "../firebase";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const history = useHistory();

  console.log(user);

  const getIdToken = async () => {
    const idTokenResult = await firebase
      .auth()
      .currentUser.getIdTokenResult(true);

    console.log(idTokenResult);
  };

  return (
    <Layout>
      <h2>Dashboard</h2>

      <button onClick={getIdToken}>Get Id token result</button>

      <button onClick={() => signOut().then(() => history.push("/login"))}>
        Sign Out
      </button>
    </Layout>
  );
};
