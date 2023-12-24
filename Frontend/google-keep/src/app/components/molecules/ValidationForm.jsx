import React from "react";
import Image from "next/image";
import arrowsvg from "../atoms/img/arrow.svg";
import SigninEmailInput from "../atoms/SigninEmailInput";
import SigninPassword from "../atoms/SigninPassword";
import style from "./ValidationForm.css";

function ValidationForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  route
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Call the onSubmit function passed as a prop
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="sign-input">
        <SigninEmailInput email={email} setEmail={setEmail} />
        <SigninPassword password={password} setPassword={setPassword} />
      </div>
      <div>
        <button name="submitSignin" className="btn signin-btn" type="submit">
          <p>Signin</p>
          <Image src={arrowsvg} width={30} height={25} alt=">" />
        </button>
      </div>
      <div>
        <p>Dont have an account?</p>
        <button name="navigateSignin" className="btn signup-btn" onClick={route}>
          signup
        </button>
      </div>
    </form>
  );
}

export default ValidationForm;
