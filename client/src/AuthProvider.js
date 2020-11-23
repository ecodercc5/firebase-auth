import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "./firebase";
import { Api } from "./services/api";

export const AuthContext = createContext({
  user: null,
  signUpWithEmailAndPassword: async (email, password) => {},
  loginWithEmailAndPassword: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

const api = new Api("http://localhost:5001/fir-auth-d0f22/us-central1/api");

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      api.getAuthToken().then((token) => console.log({ token }));
      api.get("/whrolly").then((r) => console.log(r));
    }
  }, [user]);

  useEffect(() => {
    // react to changes in auth state
    const unsubscribe = firebase.auth().onAuthStateChanged((usr) => {
      console.log("auth state change");

      setUser(usr);
      setLoading(false);

      firebase.auth().currentUser.getIdToken().then(console.log);
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
