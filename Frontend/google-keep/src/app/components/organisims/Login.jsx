"use client"
import React, { useState, useContext } from "react";
import WelcomeMessage from "../molecules/WelcomeMessage";
import SigninForm from "../molecules/SigninForm";
import { useRouter } from "next/navigation"; // Correct import
import {UserContext, } from "../Context/ContextProvider";
import axios from "axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
    const { user, setUser }= useContext(UserContext)

  const handleSignup = async () => {
    try {
        const userData = {
          name,
          email, 
          password
        };
        const User = await axios.post(
          "http://localhost:5599/api/user/",
          userData
        );
        console.log(User);
        setUser(User.data)
        console.log("user document created in firestore");
        
        setName("");
        setPassword("");
        setEmail("");



      console.log("User signed up:", User);

      router.push("/Start");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  const routeToLogin = ()=> {

      router.push("/Signin");
  }


  return (
    <div className="Login-container">
      <WelcomeMessage />
      <SigninForm
        name={name}
        email={email}
        password={password}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleSignup}
        router={routeToLogin}
      />
    </div>
  );
}

export default Login;
