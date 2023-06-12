import { toast } from "react-toastify";

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
          toast.success("Profile information updated!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        return result.json();
      })
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
};

export { handleUpdateClick };
