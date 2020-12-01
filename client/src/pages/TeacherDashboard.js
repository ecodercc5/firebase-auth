import React from "react";
import { useClasses } from "../hook/useClasses";

export const TeacherDashboard = () => {
  const { loading, error, classes } = useClasses();

  return (
    <div>
      <h2>Your Classes</h2>

      {loading ? (
        <div>loading</div>
      ) : (
        <ul>
          {classes.map((c) => {
            const { id, name } = c;

            return <li key={id}>{name}</li>;
          })}
        </ul>
      )}

      <form>
        <input />
        <button>Add Class</button>
      </form>
    </div>
  );
};
