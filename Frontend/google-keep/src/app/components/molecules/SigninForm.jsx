import React from "react";
import Image from "next/image";
import arrowsvg from "../atoms/img/arrow.svg";
import SigninEmailInput from "../atoms/SigninEmailInput";
import SigninPassword from "../atoms/SigninPassword";
import style from "./SigninForm.css";
import RepeatPassword from "../atoms/RepeatPassword";

function SigninForm({
  name,
  email,
  password,
  repeatPassword,
  setName,
  setEmail,
  setPassword,
  setRepeatPassword,
  onSubmit,
  router,
  formError
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Call the onSubmit function passed as a prop
  };

  return (
    <>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="sign-input">
          {/* adding name for user */}
          <input
            className="name-input input"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <SigninEmailInput email={email} setEmail={setEmail} />
          <SigninPassword password={password} setPassword={setPassword} />
          <RepeatPassword
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
          />
        </div>
        <div>
          <button
            name="submitSignin"
            className={`btn signin-btn ${
              formError === "Passords-not-match" && "red"
            }`}
            type="submit"
          >
            <p>Signup</p>
            <Image src={arrowsvg} width={30} height={25} alt=">" />
          </button>
        </div>
        <div>
          <div className="check-err">
            <p className="p">Allready have an account?</p>
            {formError === "Passords-not-match" && (
              <p className="red">Passwords not match</p>
            )}
          </div>
          <button
            name="navigateSignin"
            className="btn signup-btn"
            onClick={router}
          >
            Signin
          </button>
        </div>
      </form>
    </>
  );
}

export default SigninForm;





