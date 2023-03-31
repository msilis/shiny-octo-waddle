import style from "./savedEditModal.module.css";
import { React, Fragment } from "react";

export default function EditModal({ gameToEditId, showModal, setShowModal }) {
  //Conditionally render modal depending on state
  const modalDisplay = showModal
    ? `${style.modalVisible}`
    : `${style.modalHidden}`;

  //Cancel button function
  function handleCancelEditClick() {
    setShowModal(false);
  }

  return (
    <div className={modalDisplay}>
      <div className={style.mainModalContainer}>
        <h3>Edit your game</h3>
        <input placeholder="Game Name" />
        <div className={style.buttonContainer}>
          <div className={style.saveButton}>
            <span>Save</span>
          </div>
          <div className={style.cancelButton} onClick={handleCancelEditClick}>
            <span>Cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
