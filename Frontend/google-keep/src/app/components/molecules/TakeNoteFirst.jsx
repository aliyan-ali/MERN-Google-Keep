import React from 'react';
import NoteBigIcon from '../atoms/NoteBigIcon';

const TakeNoteFirst = () => {
  return (
    <div className="first-block">
    {/* <span>Title</span> */}
    <input name='tittle' placeholder='Add tittle...' className='add-tittle'/>
    <NoteBigIcon alttext='pinIcon-svg'/>
    </div>
  )
}

export default TakeNoteFirst;