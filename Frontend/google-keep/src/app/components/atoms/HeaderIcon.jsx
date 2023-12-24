import React from "react";
import Image from "next/image";
import "./HeaderIcon.css";

const HeaderIcon = ({ icon,title,alt}) => {
  return (
    <div className="icon-box">
      <Image src={icon} title={title} alt={alt} />
    </div>
  );
};

export default HeaderIcon;
