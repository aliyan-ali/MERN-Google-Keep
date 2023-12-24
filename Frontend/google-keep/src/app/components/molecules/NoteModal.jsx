// // NoteModal.js
// import React, { useState } from "react";

// const NoteModal = ({ isOpen, onClose, onSave, title, content }) => {
//   const [editedTitle, setEditedTitle] = useState(title);
//   const [editedContent, setEditedContent] = useState(content);

//   const handleSave = () => {
//     onSave(editedTitle, editedContent);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <input
//           type="text"
//           placeholder="Title"
//           value={editedTitle}
//           onChange={(e) => setEditedTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Take a note..."
//           value={editedContent}
//           onChange={(e) => setEditedContent(e.target.value)}
//         />
//         <button onClick={handleSave}>Save</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default NoteModal;



// NoteModal.js
import React, { useState } from "react";
import NoteIcons from "../atoms/NoteIcons";
import addIcon from "../atoms/img/addIcon.svg";
import personaddIcon from "../atoms/img/personaddIcon.svg";
import paintIcon from "../atoms/img/paintIcon.svg";
import imgIcon from "../atoms/img/imgIcon.svg";
import archiveIcon from "../atoms/img/archiveIcon.svg";
import moreIcon from "../atoms/img/moreIcon.svg";
// import NoteBigIcon from "../atoms/NoteBigIcon";

const NoteModal = ({ isOpen, onClose, onSave, title, content }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(editedTitle, editedContent);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <input
          type="text"
          placeholder="Title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          placeholder="Take a note..."
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        {/* <button onClick={handleSave}>Save</button> */}
        <div className="modal-icons">
          <div className="taken-note-icons">
            <NoteIcons icon={addIcon} alttxt="addIcon-svg" />
            <NoteIcons icon={personaddIcon} alttxt="personaddIcon-svg" />
            <NoteIcons icon={paintIcon} alttxt="paintIcon-svg" />
            <NoteIcons icon={imgIcon} alttxt="imgIcon-svg" />
            <NoteIcons icon={archiveIcon} alttxt="archiveIcon-svg" />
            <NoteIcons icon={moreIcon} alttxt="moreIcon-svg" />
          </div>
        <button onClick={handleSave}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;

