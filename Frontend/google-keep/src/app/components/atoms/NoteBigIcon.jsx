import React from 'react';
import Image from 'next/image';
import style from './NoteBigIcon.css'
import pinIcon from './img/pinIcon.svg'

const NoteBigIcon = ({alttext}) => {
  return (
    <div className='input-box-icon-big'>
      <Image src={pinIcon} alt={alttext}/>
    </div>
  )
}

export default NoteBigIcon;
