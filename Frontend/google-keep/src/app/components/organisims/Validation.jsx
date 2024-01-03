import React, { useContext, useState, useEffect } from "react";
import WelcomeMessage from "../molecules/WelcomeMessage";
import ValidationForm from "../molecules/ValidationForm";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext } from "../Context/ContextProvider";
import { jwtDecode } from "jwt-decode";



function Validation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [wrongPassword, setWrongPassword] = useState(false);



  const handleSignup = async () => {

        try {
          const response = await axios.post(
            "https://bright-calf-pantsuit.cyclic.app/api/user/login",
            {
              email,
              password,
            }
          );
          // console.log(response)
            const token = response.data
            
            localStorage.setItem("token", token);
            //adding decode
            const decoded = jwtDecode(token)
            setUser(decoded) 

          // setUser(user);

          // Example: Redirect to the user's profile page
          router.push("/Start");
        } catch (error) {

          console.error("Login failed", error.message);
          setEmail("");
          setPassword("");
          setWrongPassword(true);
          setTimeout(() => {
          setWrongPassword(false);
          }, 3000);
        }
  };
  const routeToSignup = () => {
    router.push("/");
  };

  return (
    <div className="Login-container">
      <WelcomeMessage />
      <ValidationForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleSignup}
        route={routeToSignup}
        wrongPassword={wrongPassword}
      />
    </div>
  );
}

export default Validation;
