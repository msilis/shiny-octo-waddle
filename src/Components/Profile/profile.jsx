import style from "./profile.module.css";
import { useRef } from "react";
import { handleUpdateClick } from "./profile-utils";

export default function Profile({
  firstName,
  lastName,
  email,
  userId,
  setFirstName,
  setLastName,
  setEmail,
}) {
  // Refs for inputs ==================================================
  const firstNameEditInput = useRef();
  const lastNameEditInput = useRef();
  const emailEditInput = useRef();

  //Enter key used to update info =================================
  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleUpdateClick();
    }
  }

  /* =============================================================
||||||||||||||||| Return ||||||||||||||||||||||||||||||||||||||||\
================================================================= */

  return (
    <div className={style.profileContainer}>
      <div className={style.profileVisible}>
        <input
          placeholder={firstName}
          className={style.inputField}
          ref={firstNameEditInput}
          onKeyDown={handleEnterKey}
        ></input>
        <input
          placeholder={lastName}
          className={style.inputField}
          ref={lastNameEditInput}
          onKeyDown={handleEnterKey}
        ></input>
        <input
          placeholder={email}
          className={style.inputField}
          ref={emailEditInput}
          onKeyDown={handleEnterKey}
        ></input>
        <div
          className={style.updateButton}
          onClick={() =>
            handleUpdateClick(
              firstNameEditInput,
              lastNameEditInput,
              emailEditInput,
              firstName,
              lastName,
              email,
              userId,
              setFirstName,
              setLastName,
              setEmail
            )
          }
        >
          <span>Update</span>
        </div>
      </div>
    </div>
  );
}
