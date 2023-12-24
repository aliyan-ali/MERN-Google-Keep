import React from "react";
import Image from "next/image";
import lightbulbIcon from "./img/lightbulbIcon.svg";
import style from "./SidebarIcons.css";

const SidebarIcons = ({ icon, text, altxtsideicon}) => {

  return (
    <>
      <div className="side-icons">
        <div className="iconsCom">
          <Image src={icon} alt={altxtsideicon}/>
        </div>
        <div className="text">
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default SidebarIcons;
