import React from 'react';
import style from './Noteicons.css';
import Image from 'next/image';


const NoteIcons = ({icon,alttxt}) => {
  return (
    <>
<div className="icons">
    <Image src={icon} alt={alttxt}/>
</div>
    </>
  )
}

export default NoteIcons;