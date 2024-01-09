import React from "react";
import style from "./RepeatPassword.css";

function RepeatPassword({ repeatPassword, setRepeatPassword }) {
  return (
    <input
      type="password"
      onChange={(e) => setRepeatPassword(e.target.value)}
      value={repeatPassword}
      required
      placeholder="Repeat password ..."
      className="input input-pass input-R-pass"
    />
  );
}

export default RepeatPassword;
