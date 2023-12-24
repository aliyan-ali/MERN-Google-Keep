import React from 'react'
import style from "./SigninPassword.css";

function SigninPassword({setPassword, password}) {
  return (
    <input
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      required
      placeholder="Enter Password ..."
      className="input input-pass"
    />
  );
}

export default SigninPassword