import React, { useState } from "react";
import { useAddClass, useClasses } from "../hook/useClasses";

export const TeacherDashboard = () => {
  const [className, setClassName] = useState("");
  const { loading, error, classes } = useClasses();
  const [addClass] = useAddClass();

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

      <form
        onSubmit={(e) => {
          e.preventDefault();

          addClass({ name: className });

          setClassName("");
        }}
      >
        <input
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button>Add Class</button>
      </form>
    </div>
  );
};
