import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "./firebase";
import { Api } from "./services/api";

export const AuthContext = createContext({
  auth: { user: null, claims: null },
  signUpWithEmailAndPassword: async (email, password) => {},
  loginWithEmailAndPassword: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshClaims: async () => {},
});

const api = new Api("http://localhost:5001/fir-auth-d0f22/us-central1/api");

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [claims, setClaims] = useState(null);

  const history = useHistory();

  useEffect(() => {
    // react to changes in auth state
    const unsubscribe = firebase.auth().onAuthStateChanged(async (usr) => {
      setLoading(true);

      console.log("auth state change");

      if (usr) {
        const idTokenResult = await firebase
          .auth()
          .currentUser.getIdTokenResult(true);

        console.log(idTokenResult.token);
        setClaims(idTokenResult.claims);
      } else {
        setClaims(null);
      }

      setUser(usr);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const navigateAfterAuthenticated = async () => {
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();

    const role = idTokenResult.claims.role;

    // user did not define role yet -> navigate to setup page
    if (!role) return history.push("/setup");

    return history.push("/dashboard");
  };

  const navigateAfterLogout = () => history.push("/login");

  const signUpWithEmailAndPassword = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(navigateAfterAuthenticated);
  };

  const loginWithEmailAndPassword = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(navigateAfterAuthenticated);
  };

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(navigateAfterAuthenticated);
  };

  const signOut = () => {
    return firebase.auth().signOut().then(navigateAfterLogout);
  };

  const refreshClaims = async () => {
    if (user) {
      const idTokenResult = await firebase
        .auth()
        .currentUser.getIdTokenResult(true);

      setClaims(idTokenResult.claims);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth: {
          user,
          claims,
        },
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        signInWithGoogle,
        signOut,
        refreshClaims,
      }}
    >
      {loading ? <div>loading!!!</div> : children}
    </AuthContext.Provider>
  );
};
