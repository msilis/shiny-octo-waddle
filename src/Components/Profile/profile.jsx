import style from "./profile.module.css";
import { SavedGames } from "../../Components";
import { useRef } from "react";

export default function Profile({
  firstName,
  lastName,
  email,
  userId,
  setFirstName,
  setLastName,
  setEmail,
}) {
  const firstNameEditInput = useRef();
  const lastNameEditInput = useRef();
  const emailEditInput = useRef();

  function handleUpdateClick() {
    console.log("Update clicked");
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
    //TODO Update is sucessful but component doesn't re-render with new information
    try {
      fetch("http://localhost:8080/updateUser", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateUserData),
      })
        .then((result) => result.json())
        .then((data) => {
            
            //Set state for updated values
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={style.profileContainer}>
      <h4>Profile</h4>
      <div className={style.profileFields}>
        <input
          placeholder={firstName}
          className={style.inputField}
          ref={firstNameEditInput}
        ></input>
        <input
          placeholder={lastName}
          className={style.inputField}
          ref={lastNameEditInput}
        ></input>
        <input
          placeholder={email}
          className={style.inputField}
          ref={emailEditInput}
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
