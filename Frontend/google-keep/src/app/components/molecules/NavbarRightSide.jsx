// 'use client'
import React, { useContext, useState } from "react";
import Image from "next/image";
import HeaderIcon from "../atoms/HeaderIcon";
import refreshIcon from "../atoms/img/refreshIcon.svg";
import viewlistIcon from "../atoms/img/viewlistIcon.svg";
import settingsIcon from "../atoms/img/settingsIcon.svg";
import appsIcon from "../atoms/img/appsIcon.svg";
import useraccountIcon from "../atoms/img/useraccountIcon.svg";
import { useRouter } from "next/navigation";
import styles from "./NavbarRightSide.css";
import "react-toastify/dist/ReactToastify.css";

import {UserContext } from "../Context/ContextProvider";
import { toast } from "react-toastify";


const NavbarRightSide = () => {

  //calling contextapi

  // const userDisplayName =  useContext(ContextProvider);
  const router = useRouter();

    
  const { user,setUser }= useContext(UserContext)

  const display = user?.name;


  // console.log(userDisplayName)
  
    function signout () {
        localStorage.removeItem('token');
        // localStorage.removeItem('user');
        toast.success("logging out")
        setUser(null)
        setTimeout(() => {
          router.push("/");
          
        }, 4000);
        console.log("user logged out Successfully")


    }

    
  return (
    <>
      <div className="navbar-right-side">
        <p>
          Welcome: <span>{display}</span>
        </p>
        <HeaderIcon icon={refreshIcon} title="Refresh" alt="refresh-icon-svg" />
        <HeaderIcon icon={viewlistIcon} title="List view" alt="view-icon-svg" />
        <HeaderIcon
          icon={settingsIcon}
          title="Settings"
          alt="settings-icon-svg"
        />
        <HeaderIcon icon={appsIcon} title="apps" alt="apps-icon-svg" />
        <HeaderIcon
          icon={useraccountIcon}
          title="user Account"
          alt="user-account-icon-svg"
        />
        <button className="btn btn-logout" onClick={signout}>Logout</button>
      </div>
    </>
  );
};

export default NavbarRightSide;
