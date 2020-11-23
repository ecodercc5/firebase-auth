import { firebase } from "../firebase";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const SETUP_ROUTE = "/setup";

export const useAuthRoleSetup = ({ required = true } = {}) => {
  const history = useHistory();

  useEffect(() => {
    const getUserRoleExists = async () => {
      const idTokenResult = await firebase
        .auth()
        .currentUser.getIdTokenResult();
      const role = idTokenResult.claims.role;
      return Boolean(role);
    };
    getUserRoleExists().then((roleExists) => {
      if (!roleExists && required) return history.push(SETUP_ROUTE);
      if (roleExists && !required) return history.push("/dashboard");
    });
  }, [history, required]);
};
