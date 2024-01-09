"use client"
import React, { useState, useContext } from "react";
import WelcomeMessage from "../molecules/WelcomeMessage";
import SigninForm from "../molecules/SigninForm";
import { useRouter } from "next/navigation"; // Correct import
import {UserContext, } from "../Context/ContextProvider";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { user, setUser }= useContext(UserContext);
  const [formError, setFormError] = useState("");

  const handleSignup = async () => {
    try {
      if ( email === "" || password === "" || repeatPassword === "" || name === "") {
        setFormError("missing-values")
        setTimeout(() => {
          setFormError("")
        }, 2000);
                setName("");
                setPassword("");
                setRepeatPassword("");
                setEmail("");

      }else if( password !== repeatPassword){
        toast.warn("please fill the required fields")
        setFormError("Passords-not-match")  
        setTimeout(() => {
          setPassword("");
          setFormError("");
          setRepeatPassword("");
        }, 2000);
      }else{
        const userData = {
          name,
          email, 
          password
        };
        const response = await axios.post(
          "http://localhost:5599/api/user/",
          userData
        );
        console.log(response);
        const token = response.data
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        setUser(decoded); 
        console.log("user document created " , decoded);
        
        setName("");
        setPassword("");
        setEmail("");
        setRepeatPassword("");

      console.log("User signed up:", decoded);

          
      return router.push("/Start");;
      }
      toast.warn("Error signing up. Try again")
      setTimeout(() => {
        return setFormError("")
      }, 3000);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.warn("Error signing up. Try again");
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
        repeatPassword={repeatPassword}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        onSubmit={handleSignup}
        router={routeToLogin}
        formError={formError}
      />
    </div>
  );
}

export default Login;
