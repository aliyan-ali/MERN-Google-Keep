import React from "react";
import Image from "next/image";
import arrowsvg from "../atoms/img/arrow.svg";
import SigninEmailInput from "../atoms/SigninEmailInput";
import SigninPassword from "../atoms/SigninPassword";
import style from "./ValidationForm.css";
import { useRouter } from "next/router";

function ValidationForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  route,
  wrongPassword
}) {

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      {wrongPassword ? (
        <p className="wrong-password">
          <strong>Wrong email or password.</strong>
        </p>
      ) : null}
      <div className="sign-input">
        <SigninEmailInput email={email} setEmail={setEmail} />
        <SigninPassword password={password} setPassword={setPassword} />
      </div>
      <div>
        <button
          name="submitSignin"
          className={`btn signin-btn ${wrongPassword ? "btn-red" : ""}`}
          type="submit"
        >
          <p>Signin</p>
          <Image src={arrowsvg} width={30} height={25} alt=">" />
        </button>
      </div>
      <div>
        <div className="links-box">
          <p>Dont have an account?</p>
          <a onClick={() => router.push("/Sendotp")}>Forgotten password</a>
        </div>
        <button
          name="navigateSignin"
          className="btn signup-btn"
          onClick={route}
        >
          signup
        </button>
      </div>
    </form>
  );
}

export default ValidationForm;
