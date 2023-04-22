import style from "./profile.module.css";
import { SavedGames } from "../../Components";
import { useRef, useState } from "react";

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
  const [showProfile, setShowProfile] = useState(false);

  function handleUpdateClick() {
    console.log("Update clicked");
    console.log(lastNameEditInput.current?.value);
    const updateUserData = {
      userId: userId,
      firstName:
        firstNameEditInput.current?.value !== ""
          ? firstNameEditInput.current?.value
          : firstName,
      lastName:
        lastNameEditInput.current?.value !== ""
          ? lastNameEditInput.current?.value
          : lastName,
      email:
        emailEditInput.current?.value !== ""
          ? emailEditInput.current?.value
          : email,
    };
    try {
      fetch("http://localhost:8080/updateUser", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "X-custom-cookie": "jwt",
        },
        credentials: "include",
        body: JSON.stringify(updateUserData),
      })
        .then((result) => result.json())
        .then((data) => {
          //Set state for updated values
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          //Set refs to empty strings to show updated values
          firstNameEditInput.current.value = "";
          lastNameEditInput.current.value = "";
          emailEditInput.current.value = "";
        });
    } catch (err) {
      console.log(err);
    }
  }

  //Conditionally show profile info
  const profileDisplay = showProfile
    ? `${style.profileVisible}`
    : `${style.profileHidden}`;

  function handleProfileButtonClick() {
    setShowProfile(true);
  }

  function handleProfileHide() {
    setShowProfile(false);
  }

  //Enter key used to update info =================================
  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleUpdateClick();
    }
  }

  /* =============================================================
||||||||||||||||| ||||||||||||||||||||||||||||||||||||||||||||||\
================================================================= */

  return (
    <div className={style.profileContainer}>
      <button
        className={style.profileButton}
        onClick={showProfile ? handleProfileHide : handleProfileButtonClick}
      >
        {showProfile ? "Hide Profile" : "Show Profile"}
      </button>
      <div className={profileDisplay}>
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
        <div className={style.updateButton} onClick={handleUpdateClick}>
          <span>Update</span>
        </div>
      </div>
      <div className={style.savedGamesContainer}>
        <SavedGames userId={userId} />
      </div>
    </div>
  );
}
