"use client";
import React, { useContext, useState } from "react";
import Sidebar from "../molecules/Sidebar";
import styles from "../organisims/MainSection.css";
import Note from "../molecules/Note";
import { UserContext } from "../Context/ContextProvider";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
const MainSection = () => {

  const { token, exptoken } = useContext(UserContext);

  if (exptoken) {
    toast.warning("session expired please login again")
  }

  return (
    <>
      {
        <section className="main-section">
          {<Sidebar />}
          <div className="main-sub-sectionmain-sub-section">
            <Note />
          </div>
          <ToastContainer />
        </section>
      }

      {/* <Note /> */}
    </>
  );
};

export default MainSection;
