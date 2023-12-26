import React from "react";
import Image from "next/image";
import "./HeaderIcon.css";

const CrossIcon = ({ icon, title, alt }) => {
  return (
    <div className="icon-box">
      <Image src={icon} title={title} alt={alt} width={30} height={30}/>
    </div>
  );
};

export default CrossIcon;
