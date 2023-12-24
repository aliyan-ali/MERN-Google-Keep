import React from "react";
import Image from "next/image";
import refreshIcon from "./img/refreshIcon.svg";

const RefreshIcon = () => {
  return (
    <>
      <div>
        <Image src={refreshIcon}/>
      </div>
    </>
  );
};

export default RefreshIcon;