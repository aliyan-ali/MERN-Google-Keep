"use client";
import React, { useState } from "react";
import Sidebar from "../molecules/Sidebar";
import styles from "../organisims/MainSection.css";
import Note from "../molecules/Note";

const MainSection = () => {
  return (
    <>
      { <section className="main-section">
        { <Sidebar /> }
        <div className="main-sub-sectionmain-sub-section">
        <Note />
        </div>
      </section>
       }


      {/* <Note /> */}
    </>
  );
};

export default MainSection;
