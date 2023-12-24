import React, { createContext,  useState,useEffect  } from "react";
import axios from "axios";


export const UserContext = createContext();

 function UserProvider({ children }) {

   
   const [user, setUser] = useState(null);
   
  //  useEffect(() => {
  //    const token = localStorage.getItem('token');
  //    const id = localStorage.getItem('id');
     
  //    if (token && id  == user?._id) {
  //      axios.get(`http://localhost:5599/api/user/singleuser/${id}`, {
  //        headers: {
  //          Authorization: `Bearer ${token}`
  //        }
  //      })
  //        .then(response => {
  //         console.log(response.data);
  //          setUser(response.data);
  //        })
  //        .catch(error => {
  //          console.error('Failed to retrieve user data', error.message);
  //          // Handle unauthorized access, e.g., redirect to login page
  //        });
  //    }
  //  }, [user]);

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

  console.log('logged in user is: ', user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export  default UserProvider;