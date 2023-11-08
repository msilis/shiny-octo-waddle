import { TOAST_TEXT } from "../../Utilities/Config/ui-text";
import { showGenericToast } from "../../Utilities/toastGeneric";
import { showSuccessToast } from "../../Utilities/toastSuccess";

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
      fetch("https://group-class-backend.onrender.com/updateUser", {
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
      console.log(err);
    }
  }
};

export { handleUpdateClick };
