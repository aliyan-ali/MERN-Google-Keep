import React, { useContext } from "react";
import Image from "next/image";
import "./HeaderIcon.css";
import { UserContext } from "../Context/ContextProvider";

const HeaderIcon = ({ icon, title, alt, click }) => {


  return (
    <div className="icon-box">
      <Image src={icon} title={title} onClick={click} alt={alt} />
    </div>
  );
};

export default HeaderIcon;
