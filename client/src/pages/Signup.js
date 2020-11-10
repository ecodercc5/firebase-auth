import React from "react";
import { useForm } from "../hook/useForm";
import { firebase } from "../firebase";

export const Signup = () => {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form);

          const { email, password } = form;

          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((credential) => console.log(credential))
            .catch((err) => console.error(err));
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  );
};
