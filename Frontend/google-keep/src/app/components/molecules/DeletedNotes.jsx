import React, { useState, useEffect, useContext } from "react";
import styles from "./DeletedNotes.css";
import NoteIcons from "../atoms/NoteIcons";
import deleteIcon from "../atoms/img/delete.svg";
import restoreIcon from "../atoms/img/restore.svg";
import { UserContext } from "../Context/ContextProvider";
import axios from "axios";
import { SearchContext } from "../Context/SearchProvider";
import { ToastContainer, toast } from "react-toastify";

function DeletedNotes() {
  const { user, layout, setExpToken, exptoken } = useContext(UserContext);
  const { searchQuery, filteredNotes, handleSearch, notes, setNotes } =
      useContext(SearchContext);
  const [deleteNotes, setDeleteNotes] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  //get all notes for admin
  const getUserDeletedNotes = async () => {
    if (user) {
      if (user.role === "admin") {
        // console.log(user);
        try {
          const token = localStorage.getItem("token");
          console.log("Fetching notes for admin...");
          setExpToken(false);
          const response = await axios.get(
            "http://localhost:5599/api/user/all-delete-note",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setNotes(response.data);
        } catch (error) {
          setExpToken(true);
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
            `http://localhost:5599/api/user/get-delete-note/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNotes(response.data);
        } catch (error) {
          setExpToken(true);
          console.error("Failed to fetch user notes", error.message);

          return [];
        }
        console.log("notes fetched");
      }
    }
  };

  // delete note
  const handleDeleteNote = async (note) => {
    console.log(note._id);
      if (note && user) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.delete(
            `http://localhost:5599/api/user/perminently-delete-note/${note._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add the bearer token here
              },
            }
          );
          console.log("Note deleted with ID: ", note._id);
          toast.warn("Note deleted");
          getUserDeletedNotes();
        } catch (error) {
          console.error("Error deleting note: ", error);
        }
      }
  };

  // restore note
  const handleRestoreNote = async (note) => {
    console.log(note._id);
    if (note && user) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `http://localhost:5599/api/user/restore-note/${note._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the bearer token here
            },
          }
        );
        console.log("Note restore with ID: ", note._id);
        toast.success("Note restored");
        getUserDeletedNotes();
      } catch (error) {
        console.error("Error restore note: ", error);
      }
    }
  };
  

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteAllNotes = async () => {
    if (notes && user) {
      try {
        console.log(user._id);
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:5599/api/user/perminently-delete-all-notes/${user._id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Empty recycle bin for : ", user.email);
        getUserDeletedNotes();
      } catch (error) {
        console.error("Error deleting note: ", error);
      }
    }
    setModalOpen(false);
  };

  useEffect(() => {
    getUserDeletedNotes();
  }, [user]);

  useEffect(() => {
    if (exptoken === "true") {
      toast.warning("session expired please login again");
      console.log("toast");
    }
  }, [exptoken]);

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
      <div className="title-delete">
        <p>Delete notes to delete perminently</p>
        {/* <button>Empty Trash</button> */}
        {notes.length > 0 && (
          // <button onClick={() => deleteAllNotes()}>
          <button onClick={openModal}>Empty Trash</button>
        )}
      </div>
      <div className={`notesGrid ${layout}`}>
        {/* {console.log(layout)} */}
        {filteredNotes.length > 0
          ? filteredNotes.map((note, index) => (
              <div key={index} className="note">
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
                  <div className="iconCom flex-start">
                    <div
                      onClick={() => {
                        handleDeleteNote(note);
                      }}
                      title="delete"
                    >
                      <NoteIcons icon={deleteIcon} alttxt="deleteIcon-svg" />
                    </div>
                    <div
                      onClick={() => {
                        handleRestoreNote(note);
                      }}
                      title="restore"
                    >
                      <NoteIcons icon={restoreIcon} alttxt="restoreIcon-svg" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : notes.map((note, index) => (
              <div key={index} className="note">
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
                    <div
                      onClick={() => {
                        handleDeleteNote(note);
                      }}
                      title="delete"
                    >
                      <NoteIcons icon={deleteIcon} alttxt="deleteIcon-svg" />
                    </div>
                    <div
                      onClick={() => {
                        handleRestoreNote(note);
                      }}
                      title="restore"
                    >
                      <NoteIcons icon={restoreIcon} alttxt="restoreIcon-svg" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        {isModalOpen && (
          <div className="modalOverlay">
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-titlee ">
                Empty trash? All notes in Trash will be permanently deleted.
              </h2>
              <div className="iconComm">
                <span className="closeButton" onClick={() => closeModal()}>
                  Cancel
                </span>
                <span className="d-btn" onClick={() => deleteAllNotes()}>
                  Empty Trash
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeletedNotes;
