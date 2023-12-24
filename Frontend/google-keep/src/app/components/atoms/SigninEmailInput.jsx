import React from 'react'
import style from './signinEmailInput.css'

function SigninEmailInput({setEmail, email}) {
  return (
    <input
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      required
      name="email"
      value={email}
      placeholder="Enter Email ...."
      className="input input-sup"
    />
  );
}

export default SigninEmailInput