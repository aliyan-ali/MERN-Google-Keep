import React from "react";
import Image from "next/image";
import LogoImg from "./img/keeplogo.png";

const Logo = (til) => {
  return (
    <>
    <div>
      <Image src={LogoImg} width={40} height={40} title={til} alt='logo_image ' />
    </div>
    </>
  );
};

export default Logo;
