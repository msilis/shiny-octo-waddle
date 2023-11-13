import { API_URL } from "../../Utilities/Config/api";
import { ERROR_MESSAGE, TOAST_TEXT } from "../../Utilities/Config/ui-text";
import { showErrorToast } from "../../Utilities/toastError";
import { showGenericToast } from "../../Utilities/toastGeneric";
import { showSuccessToast } from "../../Utilities/toastSuccess";
import { UserContext } from "../../userContext";
import { useContext } from "react";

const handleUpdateClick = (
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
) => {
  if (
    firstNameEditInput.current?.value === "" &&
    lastNameEditInput.current?.value === "" &&
    emailEditInput.current?.value === ""
  ) {
    showGenericToast(TOAST_TEXT.noChangeMessage);
  } else {
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
      fetch(API_URL.updateUser, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "X-custom-cookie": "jwt",
        },
        credentials: "include",
        body: JSON.stringify(updateUserData),
      })
        .then((result) => {
          if (result.status === 200) {
            showSuccessToast(TOAST_TEXT.profileUpdated);
          }
          return result.json();
        })
        .then((data) => {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);

          firstNameEditInput.current.value = "";
          lastNameEditInput.current.value = "";
          emailEditInput.current.value = "";
        });
    } catch (err) {
      showErrorToast(ERROR_MESSAGE.profileUpdateError);
      console.log(err);
    }
  }
};

const handleGoogleDisplayNameUpdate = async (
  googleNameEditInput,
  setDisplayName
) => {
  if (googleNameEditInput.current?.value === "") {
    showGenericToast(TOAST_TEXT.noChangeMessage);
  }
  const updatedGoogleInfo = {
    googleUserId: sessionStorage.getItem("googleUserId"),
    googleDisplayName: googleNameEditInput.current?.value,
  };
  try {
    const updateResponse = await fetch(API_URL.updateGoogleDisplayName, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "X-custom-cookie": "jwt",
      },
      credentials: "include",
      body: JSON.stringify(updatedGoogleInfo),
    });
    if (!updateResponse.ok) {
      throw new Error(ERROR_MESSAGE.profileUpdateError);
    }
    const data = await updateResponse.json();
    console.log(data, "data");
    setDisplayName(data.googleName);
    showSuccessToast(TOAST_TEXT.profileUpdated);
  } catch (error) {
    showErrorToast(ERROR_MESSAGE.profileUpdateError);
    console.log(error);
  }
};

export { handleUpdateClick, handleGoogleDisplayNameUpdate };
