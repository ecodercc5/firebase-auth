import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useAuthRoleSetup } from "../hook/useAuthRoleSetup";
import { roleApi } from "../services/roleApi";

export const Setup = () => {
  useAuthRoleSetup({ required: false });

  const history = useHistory();
  const { refreshClaims } = useAuth();

  const handleSelectTeacher = () => {
    roleApi.setAsTeacher().then(() => {
      refreshClaims().then(() => history.push("/dashboard"));
    });
  };

  const handleSelectStudent = () => {
    roleApi.setAsStudent().then(() => {
      refreshClaims().then(() => history.push("/dashboard"));
    });
  };

  return (
    <div>
      <h2>Are you a ...</h2>
      <button onClick={handleSelectTeacher}>Teacher</button>
      <button onClick={handleSelectStudent}>Student</button>
    </div>
  );
};
