import React, { useState, useEffect, useContext } from "react";
import Styles from "./Note.css";
import NoteIcons from "../atoms/NoteIcons";
import addIcon from "../atoms/img/addIcon.svg";
import personaddIcon from "../atoms/img/personaddIcon.svg";
import paintIcon from "../atoms/img/paintIcon.svg";
import imgIcon from "../atoms/img/imgIcon.svg";
import archiveIcon from "../atoms/img/archiveIcon.svg";
import moreIcon from "../atoms/img/moreIcon.svg";
import deleteIcon from "../atoms/img/delete.svg";
import { UserContext } from "../Context/ContextProvider";
import axios from "axios";
import { SearchContext } from "../Context/SearchProvider";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const Card = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editNote, setEditNote] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { user, layout, setExpToken, exptoken } = useContext(UserContext);
  const { searchQuery, filteredNotes, handleSearch, notes, setNotes } =
    useContext(SearchContext);

  const router = useRouter();

  useEffect(() => {
    if (exptoken === "true") {
      toast.warning("session expired please login again");
      console.log("toast");
    }
  }, [exptoken]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result); // Set image preview
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleAddNote = async () => {
    if (!user) {
      console.log("Plese log in to add notes");
      toast.warning("session expired please login again ");
      // alert("please log in to add notes");
      setTimeout(() => {
        return router.push("/Signin");
      }, 4000);
    } else if (user && (title || content)) {
      try {
        const formData = new FormData();
        formData.append("ownerId", user?._id);
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
          formData.append("image", image);
        }
        setExpToken(false);
        const response = await axios.post(
          "http://localhost:5599/api/user/add-note",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // setImagePreview(null);
        // console.log("addeed note" + response.data);
      } catch (error) {
        // Handle error
        setExpToken(null);
        console.error("Error adding note: ", error);
      }
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);
      getUserNotes();
    }
  };

  //get all notes for admin
  const getUserNotes = async () => {
    if (user) {
      if (user.role === "admin") {
        // console.log(user);
        try {
          const token = localStorage.getItem("token");
          console.log("Fetching notes for admin...");
          setExpToken(false);
          const response = await axios.get(
            "http://localhost:5599/api/user/get-all-notes",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setNotes(response.data);
        } catch (error) {
          setExpToken(null);
          console.error("Failed to fetch user notes", error.message);
          if (error) {
            console.warn("forbidden", error);
          }
          return [];
        }
      } else {
        console.log("Fetching notes for regular user...");
        try {
          const token = localStorage.getItem("token");
          setExpToken(false);
          const response = await axios.get(
            `http://localhost:5599/api/user/get-note/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNotes(response.data);
        } catch (error) {
          setExpToken(false);
          console.error("Failed to fetch user notes", error.message);

          return [];
        }
        console.log("notes fetched");
      }
    }
  };
  useEffect(() => {
    getUserNotes();
  }, [user]);

  const handleEditNote = async () => {
    if (!user) {
      console.log("User not Logged in");
      return;
    }

    if (editTitle || editContent) {
      if (editNote) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.patch(
            `http://localhost:5599/api/user/edit-note/${editNote._id}`,
            {
              title: editTitle,
              content: editContent,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add the bearer token here
              },
            }
          );

          // console.log("Note updated with ID: ", user._id);
        } catch (error) {
          console.error("Error updating note: ", error);
        }
        setEditNote(null);
        setEditTitle("");
        setEditContent("");
        getUserNotes();
      }
    }
  };

  //add to  deleted notes
  // const handleDeleteNote = async (note) => {
  //   if (editNote) {
  //     if (note && user) {
  //       try {
  //         closeModal();
  //         const token = localStorage.getItem("token");
  //         const response = await axios.patch(
  //           `http://localhost:5599/api/user/delete-note/${note._id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log("Note deleted with ID: ", note);

  //         getUserNotes();
  //       } catch (error) {
  //         console.error("Error deleting note: ", error);
  //       }
  //     }
  //   }
  // };

  const handleDeleteNote = async (note) => {
    if (editNote) {
      if (note && user) {
        try {
          closeModal();
          const token = localStorage.getItem("token");
          const response = await axios.patch(
            `http://localhost:5599/api/user/delete-note/${editNote._id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Note deleted with ID: ", note);
          getUserNotes();
        } catch (error) {
          console.error("Error deleting note: ", error);
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddNote();
    }
  };

  const openEditModal = (note) => {
    setModalOpen(true);
    setEditNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlecloseandsave = () => {
    closeModal();
    closeModal();

    handleEditNote();

    // if (editNote) {
    //   handleDeleteNote(editNote);
    // }
  };


  return (
    <div className="container">
      <ToastContainer />
      {user && user.role === "admin" ? (
        <>
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Admin account!</strong> You can add, edit and delete notes.
          </div>
        </>
      ) : null}
      <div className="noteCard">
        {imagePreview && (
          <div className="img-container">
            <img src={imagePreview} alt="Selected" className="preview-img" />
          </div>
        )}
        <input
          type="text"
          className="noteTitle"
          placeholder="Title"
          value={title}
          onKeyPress={handleKeyPress}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="noteContent"
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="Bottom_icon">
          <div className="iconCom">
            <NoteIcons icon={addIcon} alttxt="addIcon-svg" />
            <NoteIcons icon={personaddIcon} alttxt="personaddIcon-svg" />
            <NoteIcons icon={paintIcon} alttxt="paintIcon-svg" />
            <div className="add-img-container">
              <NoteIcons icon={imgIcon} alttxt="imgIcon-svg" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <NoteIcons icon={archiveIcon} alttxt="archiveIcon-svg" />
            <NoteIcons icon={moreIcon} alttxt="moreIcon-svg" />
          </div>
          <p className="text_close" onClick={handleAddNote}>
            Close
          </p>
        </div>
      </div>
      <div className={`notesGrid ${layout}`}>
        {/* {console.log(layout)} */}

        {filteredNotes.length > 0
          ? filteredNotes.map((note, index) => (
              <div
                key={index}
                className="note"
                onClick={() => openEditModal(note)}
              >
                {user && user.role === "admin" ? (
                  <>
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong> Note of User </strong> ({note.ownerId?.name})
                    </div>
                  </>
                ) : null}
                {note.imageUrl && (
                  <div className="note-img-container">
                    <img
                      src={`http://localhost:5599/uploads/${note.imageUrl}`}
                      alt="note image"
                      className="note-preview-img"
                    />
                  </div>
                )}
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <div className="note_icon">
                  <div className="iconCom">
                    <NoteIcons icon={addIcon} alttxt="addIcon-svg" />
                    <NoteIcons
                      icon={personaddIcon}
                      alttxt="personaddIcon-svg"
                    />
                    <NoteIcons icon={paintIcon} alttxt="paintIcon-svg" />
                    <NoteIcons icon={imgIcon} alttxt="imgIcon-svg" />
                    <NoteIcons icon={archiveIcon} alttxt="archiveIcon-svg" />
                    <NoteIcons icon={deleteIcon} alttxt="moreIcon-svg" />
                  </div>
                </div>
              </div>
            ))
          : notes
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((note, index) => (
                <div
                  key={index}
                  className="note"
                  onClick={() => openEditModal(note)}
                >
                  {user && user.role === "admin" ? (
                    <>
                      <div className="">
                        <strong> ({note.ownerId?.name})</strong>
                      </div>
                    </>
                  ) : null}
                  {note.imageUrl && (
                    <div className="note-img-container">
                      <img
                        src={`http://localhost:5599/uploads/${note.imageUrl}`}
                        alt="note image"
                        className="note-preview-img"
                      />
                    </div>
                  )}
                  <h2>{note.title}</h2>
                  <p>{note.content}</p>
                  <div className="note_icon">
                    <div className="iconCom">
                      <NoteIcons icon={addIcon} alttxt="addIcon-svg" />
                      <NoteIcons
                        icon={personaddIcon}
                        alttxt="personaddIcon-svg"
                      />
                      <NoteIcons icon={paintIcon} alttxt="paintIcon-svg" />
                      <NoteIcons icon={imgIcon} alttxt="imgIcon-svg" />
                      <NoteIcons icon={archiveIcon} alttxt="archiveIcon-svg" />
                      <NoteIcons icon={deleteIcon} alttxt="moreIcon-svg" />
                    </div>
                  </div>
                </div>
              ))}
        {isModalOpen && (
          <div className="modalOverlay">
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <input
                className="modal-title"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                className="modal-Content"
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="iconCom">
                <NoteIcons icon={addIcon} alttxt="addIcon-svg" />
                <NoteIcons icon={personaddIcon} alttxt="personaddIcon-svg" />
                <NoteIcons icon={paintIcon} alttxt="paintIcon-svg" />
                <NoteIcons icon={imgIcon} alttxt="imgIcon-svg" />
                <NoteIcons icon={archiveIcon} alttxt="archiveIcon-svg" />
                <div
                  onClick={() => handleDeleteNote(editNote)}
                  className="delete-container"
                >
                  <NoteIcons icon={deleteIcon} alttxt="moreIcon-svg" />
                </div>
                {/* <span
                  className="d-btn"
                  onClick={() => {
                    handleDeleteNote(editNote);
                  }}
                >
                  Delete
                </span> */}
                <span className="closeButton" onClick={handlecloseandsave}>
                  Close
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
