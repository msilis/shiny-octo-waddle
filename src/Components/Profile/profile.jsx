import style from "./profile.module.css";
import { useRef, useContext } from "react";
import { handleUpdateClick } from "./profile-utils";
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
        <h5>{PAGE_TEXT.loggedInWithGoogle}</h5>
        <label htmlFor="displayName">{PAGE_TEXT.displayName}</label>
        <input
          placeholder={googleName}
          className={style.inputField}
          ref={googleNameEditInput}
        />
        <div className={style.updateButton}>
          <span>{BUTTON_TEXT.updateDisplayName}</span>
        </div>
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
