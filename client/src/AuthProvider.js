import React, { useState, createContext, useContext, useEffect } from "react";
import { firebase } from "./firebase";

export const AuthContext = createContext({
  user: null,
  signUpWithEmailAndPassword: async (email, password) => {},
  loginWithEmailAndPassword: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // react to changes in auth state
    const unsubscribe = firebase.auth().onAuthStateChanged((usr) => {
      console.log("auth state change");

      setUser(usr);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUpWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const loginWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider);
  };

  const signOut = () => {
    return firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        signInWithGoogle,
        signOut,
      }}
    >
      {loading ? <div>loading!!!</div> : children}
    </AuthContext.Provider>
  );
};
