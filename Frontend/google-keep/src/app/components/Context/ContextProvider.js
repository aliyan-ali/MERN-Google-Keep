import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


export const UserContext = createContext();

function UserProvider({ children }) {


  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [layout, setLayout] = useState('row');

  const [exptoken, setExpToken] = useState(false);
  // console.log(user)
  useEffect(() => {
    const fetchedToken = localStorage.getItem('token');
    if (fetchedToken) {
      setToken(fetchedToken);
    } else {
      // alert("please login to start creating notes")
      console.log('Token missing in local storage');
    }
  }, []);

  
  const handleLayoutChange = () => {
    const newLayout =
      layout === "row" ? "column" : "row";
      setLayout(newLayout);
  };
   useEffect(() => {

     if (token) {
       try {
         const decodedToken = jwtDecode(token); 
         const currentTime = Date.now() / 1000; 
         if (decodedToken.exp < currentTime) {
           setExpToken(true)
           if (exptoken) {
             localStorage.removeItem('token');
             setUser(null);
             setExpToken(false);
           }
         }
       } catch (error) {
         console.error('Error decoding token:', error);
         console.log("true"); // If there's an error in decoding, consider it as an expired token
       }
     };
   }, [exptoken])


  //  useEffect(() => {
  //  console.log(token, id);

  //    if (token && id ) {
  //      axios.get(`http://localhost:5599/api/user/getuser/${id}`, {
  //        headers: {
  //          Authorization: `Bearer ${token}`
  //        }
  //      })
  //        .then(response => {
  //         console.log(response.data);
  //          setUser(response.data);
  //        }).catch(error => {
  //          console.error('Failed to retrieve user data', error.message);
  //          // Handle unauthorized access, e.g., redirect to login page
  //        });

  //    }
  //    return console.log("login")
  //  }, [token]);

  useEffect(() => {
    // Check localStorage for user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage when user state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  
    
  // }, [])
  
  // console.log('logged in user is: ', user);

  return (
    <UserContext.Provider value={{
      user, setUser, token, setToken, layout, handleLayoutChange, setExpToken, exptoken }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;