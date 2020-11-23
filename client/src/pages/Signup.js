import React from "react";
import { useForm } from "../hook/useForm";
import { useAuth } from "../AuthProvider";
import { Layout } from "../Layout";

export const Signup = () => {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { signUpWithEmailAndPassword, signInWithGoogle } = useAuth();

  return (
    <Layout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form);

          const { email, password } = form;

          signUpWithEmailAndPassword(email, password);
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
        <button type="button" onClick={signInWithGoogle}>
          Sign Up With Google
        </button>
        <button>Sign Up</button>
      </form>
    </Layout>
  );
};
