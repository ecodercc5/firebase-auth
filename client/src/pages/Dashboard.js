import React from "react";
import { useAuth } from "../AuthProvider";
import { Layout } from "../Layout";
import { firebase } from "../firebase";
import { useAuthRoleSetup } from "../hook/useAuthRoleSetup";

export const Dashboard = () => {
  const { user, signOut } = useAuth();

  console.log(user);

  const getIdToken = async () => {
    const idTokenResult = await firebase
      .auth()
      .currentUser.getIdTokenResult(true);

    console.log(idTokenResult);
  };

  useAuthRoleSetup();

  return (
    <Layout>
      <h2>Dashboard</h2>

      <button onClick={getIdToken}>Get Id token result</button>

      <button onClick={signOut}>Sign Out</button>
    </Layout>
  );
};
