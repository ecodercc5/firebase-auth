import React, { useState } from "react";
import { useClasses, useJoinClass } from "../hook/useClasses";

export const StudentDashboard = () => {
  const [classCode, setClassCode] = useState("");
  const { loading, error, classes } = useClasses();
  const [joinClass] = useJoinClass();

  return (
    <div>
      <h2>You are a student</h2>

      <div>
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
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          joinClass(classCode);
        }}
      >
        <input
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
        />
        <button>Join Class</button>
      </form>
    </div>
  );
};
