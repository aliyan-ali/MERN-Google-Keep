import React, { useState, useEffect } from "react";
import style from "./SendOtp.css"
import axios from "axios";
import { useRouter } from "next/router";


function SendOtp() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongOTP, setWrongOTP] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const router = useRouter();

  const sendOTP = async (e) => {
        e.preventDefault();
        try {
            const response =await  axios.post(
                "https://bright-calf-pantsuit.cyclic.app/api/user/forgot-password",{email: email}
                );
                console.log(" senting OTP to email:", email);
            console.log(response,email)
            setWrongEmail(false);
            setIsOtpSent(true);
        } catch (error) {
          console.log(error);
            setIsOtpSent(false);
          setWrongEmail(true);
        }
  };

  // Function to reset password using OTP
  const resetPassword = async (e) => {
    if(newPassword !== confirmPassword) {
        setPasswordMismatch(true);
        setTimeout(() => {
        setPasswordMismatch(false);
            
        }, 3000);
    }else {
        try {
            const response = await axios.post(
              "https://bright-calf-pantsuit.cyclic.app/api/user/reset-password",{
                email,
                otp,
                newPassword,
              }
            );
            console.log( "password changed successfully : ",    response)
        // Reset form fields after password reset
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setWrongOTP(false);
        setIsOtpSent(false);
        router.push("/Signin");
            
        } catch (error) {
            setWrongOTP(true);
            console.log(error)
        }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <div className="container-otp">
      <div className="card">
        <h2 className="h2">Reset Password</h2>
        {!isOtpSent ? (
          <form onSubmit={sendOTP}>
            {wrongEmail && (
              <div className="error">
                <p>Email not found Please enter a valid email</p>
              </div>
            )}
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className={`${wrongEmail ? "error-input " : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="otp-btn" type="submit">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            {wrongOTP && (
              <div className="error">
                <p>Wrong otp try again</p>
              </div>
            )}
            {passwordMismatch && (
              <div className="error">
                <p>Passwords don't match</p>
              </div>
            )}
            <label>OTP:</label>
            <input
              type="text"
              className={`${wrongOTP ? "error-input " : ""}`}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label>New Password:</label>
            <input
              type="password"
              className={`${passwordMismatch ? "error-input " : ""}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              className={`${passwordMismatch ? "error-input " : ""}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="otp-btn" type="submit">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SendOtp