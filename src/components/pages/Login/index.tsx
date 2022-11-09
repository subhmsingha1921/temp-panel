import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { logInWithEmailAndPassword } from "../../../libraries/authentication";
import { auth } from "../../../libraries/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/seekers");
  }, [user, loading, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="flex flex-col text-center bg-background p-[30px]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="p-2.5 mb-2.5 text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="p-2.5 mb-2.5 text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="p-2.5 mb-2.5 text-lg text-white bg-primary1 border-none"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
