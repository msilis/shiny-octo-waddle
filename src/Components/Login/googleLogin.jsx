import { jwtDecode } from "jwt-decode";
import { STORAGE_OPTIONS } from "../../Utilities/Config/storage";
import { ROUTE_PATHS } from "../../Utilities/Config/navigation";

const checkGoogleUser = () => {
  const googleEmailToCheck = {
    email: sessionStorage.getItem(STORAGE_OPTIONS.googleLoginEmail),
  };
  fetch("https://group-class-backend.onrender.com/checkGoogleUser", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(googleEmailToCheck),
    mode: "cors",
  })
    .then((response) => {
      if (response.status === 404) {
        createGoogleUser();
      } else if (response.status === 200) {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      sessionStorage.setItem(STORAGE_OPTIONS.userId, jsonResponse._id);
    });
};

const createGoogleUser = (loginProps) => {
  const googleUserToCreate = {
    email: sessionStorage.getItem(STORAGE_OPTIONS.googleLoginEmail),
    name: sessionStorage.getItem(STORAGE_OPTIONS.googleLoginName),
  };
  fetch("https://group-class-backend.onrender.com/addGoogleUser", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(googleUserToCreate),
    mode: "cors",
  }).then((response) => {
    if (response.status === 200) {
      loginProps.setGoogleName(response.fullName);
      loginProps.setUserId(response._id);
      return;
    }
  });
};

export const googleLoginSuccess = (
  credentialResponse,
  navigate,
  loginProps
) => {
  const tokenToDecode = credentialResponse.credential;
  const decodedToken = jwtDecode(tokenToDecode);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLoginEmail, decodedToken.email);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLoginName, decodedToken.name);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLogin, true);
  checkGoogleUser(loginProps);
  loginProps.setLoggedIn(true);
  loginProps.setLoading(false);

  navigate(ROUTE_PATHS.dashboard);
};
