import React from "react";
import { useAuth } from "../AuthProvider";
import { Layout } from "../Layout";
import { useAuthRoleSetup } from "../hook/useAuthRoleSetup";
import { TeacherDashboard } from "./TeacherDashboard";
import { StudentDashboard } from "./StudentDashboard";

const ROLE = {
  Teacher: "Teacher",
  Student: "Student",
};

export const Dashboard = () => {
  useAuthRoleSetup();
  const { auth, signOut } = useAuth();

  const role = auth.claims.role;

  const getDashboard = (role) => {
    switch (role) {
      case ROLE.Student:
        return <StudentDashboard />;
      case ROLE.Teacher:
        return <TeacherDashboard />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <button onClick={signOut}>Sign Out</button>

      {getDashboard(role)}
    </Layout>
  );
};
