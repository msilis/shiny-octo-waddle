import style from "./profile.module.css";
import { useRef, useContext } from "react";
import {
  handleUpdateClick,
  handleGoogleDisplayNameUpdate,
} from "./profile-utils";
import { BUTTON_TEXT, PAGE_TEXT } from "../../Utilities/Config/ui-text";
import { UserContext } from "../../userContext";

export default function Profile({
  firstName,
  lastName,
  email,
  userId,
  setFirstName,
  setLastName,
  setEmail,
  googleName,
  displayName,
  setDisplayName,
}) {
  const firstNameEditInput = useRef();
  const lastNameEditInput = useRef();
  const emailEditInput = useRef();
  const googleNameEditInput = useRef();

  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleUpdateClick();
    }
  }

  const userContext = useContext(UserContext);

  const loggedInWithGoogle = (
    <div className={style.profileContainer} data-testid="profile-container">
      <div className={style.profileVisible}>
        <label htmlFor="displayName">{PAGE_TEXT.displayName}</label>
        <input
          placeholder={userContext.displayName}
          className={style.inputField}
          ref={googleNameEditInput}
        />
        <div
          className={style.updateButton}
          onClick={() =>
            handleGoogleDisplayNameUpdate(googleNameEditInput, setDisplayName)
          }
        >
          <span>{BUTTON_TEXT.updateDisplayName}</span>
        </div>
        <h5>{PAGE_TEXT.loggedInWithGoogle}</h5>
        <input placeholder={googleName} className={style.inputField} disabled />
        <input placeholder={email} className={style.inputField} disabled />
      </div>
    </div>
  );

  return userContext.checkGoogleLoggedIn() ? (
    loggedInWithGoogle
  ) : (
    <div className={style.profileContainer} data-testid="profile-container">
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
          <span>{BUTTON_TEXT.updateButton}</span>
        </div>
      </div>
    </div>
  );
}
