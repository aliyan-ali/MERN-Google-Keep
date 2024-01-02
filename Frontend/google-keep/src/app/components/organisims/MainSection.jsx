"use client";
import React, { useContext, useState } from "react";
import Sidebar from "../molecules/Sidebar";
import styles from "../organisims/MainSection.css";
import Note from "../molecules/Note";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../Context/ContextProvider";
import { ComponentContext } from "../Context/ComponentProvider";
import DeletedNotes from "../molecules/DeletedNotes";
const MainSection = () => {

  const { token, exptoken } = useContext(UserContext);
  const { currentComponent } = useContext(ComponentContext);

  if (exptoken) {
    toast.warning("session expired please login again")
  }

  return (
    <>
      {
        <section className="main-section">
          {<Sidebar />}
          <div className="main-sub-sectionmain-sub-section">
            {currentComponent === "notes" && <Note />}
            {currentComponent === "deleted-notes" && <DeletedNotes/>}
          </div>
          <ToastContainer />
        </section>
      }

      {/* <Note /> */}
    </>
  );
};

export default MainSection;
