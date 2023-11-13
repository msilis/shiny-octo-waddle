import { jwtDecode } from "jwt-decode";
import { STORAGE_OPTIONS } from "../../Utilities/Config/storage";
import { ROUTE_PATHS } from "../../Utilities/Config/navigation";
import { API_URL } from "../../Utilities/Config/api";

const checkGoogleUser = (loginProps) => {
  const googleEmailToCheck = {
    email: sessionStorage.getItem(STORAGE_OPTIONS.googleLoginEmail),
  };
  fetch(API_URL.checkGoogleUser, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(googleEmailToCheck),
    mode: "cors",
  })
    .then((response) => {
      if (response.status === 404) {
        createGoogleUser(loginProps);
      } else if (response.status === 200) {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      console.log({ jsonResponse });
      loginProps.setUserId(jsonResponse._id);
      sessionStorage.setItem(STORAGE_OPTIONS.googleUserId, jsonResponse._id);
      sessionStorage.setItem(
        STORAGE_OPTIONS.googleDisplayName,
        jsonResponse.displayName
      );
      loginProps.setDisplayName(jsonResponse.displayName);
    });
};

const createGoogleUser = (loginProps) => {
  const googleUserToCreate = {
    email: sessionStorage.getItem(STORAGE_OPTIONS.googleLoginEmail),
    fullName: sessionStorage.getItem(STORAGE_OPTIONS.googleLoginName),
    displayName: sessionStorage.getItem(STORAGE_OPTIONS.googleLoginName),
  };

  console.log("googleUserToCreate", googleUserToCreate);
  fetch(API_URL.addGoogleUser, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(googleUserToCreate),
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 201) {
        console.log({ data });
        loginProps.setGoogleName(data.fullName);
        loginProps.setUserId(data._id);
        loginProps.setDisplayName(data.displayName);

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
