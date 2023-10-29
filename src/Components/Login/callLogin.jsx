import { ROUTE_PATHS } from "../../Utilities/Config/navigation";
import { ERROR_MESSAGE } from "../../Utilities/Config/ui-text";
import { showErrorToast } from "../../Utilities/toastError";

export function callLogin(loginProps, navigate) {
  const loginData = {
    userName: loginProps.loginUsername.current?.value,
    password: loginProps.loginPassword.current?.value,
  };
  fetch("https://group-class-backend.onrender.com/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loginData),
    mode: "cors",
  })
    .then((response) => {
      if (response.status === 401) {
        showErrorToast(ERROR_MESSAGE.incorrectLogin);
        loginProps.setLoading(false);
        throw new Error(ERROR_MESSAGE.incorrectLogin);
      } else if (!response.ok) {
        throw Error("Network error");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      loginProps.setLoggedIn(true);
      loginProps.setFirstName(data.firstName);
      loginProps.setLastName(data.lastName);
      loginProps.setEmail(data.email);
      loginProps.setUserId(data.userId);
      loginProps.setUsername(data.username);
      sessionStorage.setItem(STORAGE_OPTIONS.loggedIn, true);
      const userInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        userId: data.userId,
      };
      sessionStorage.setItem(STORAGE_OPTIONS.user, JSON.stringify(userInfo));
      //Redirect user after sucessful login
      loginProps.setLoading(false);
      return navigate(ROUTE_PATHS.navigation);
    })
    .catch((err) => {
      console.log(err.message);
      if (err.message === "Failed to fetch")
        showErrorToast(ERROR_MESSAGE.notLoggedIn);
    });
}
