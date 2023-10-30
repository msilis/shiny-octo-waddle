import { jwtDecode } from "jwt-decode";
import { STORAGE_OPTIONS } from "../../Utilities/Config/storage";

export const googleLoginSuccess = (credentialResponse) => {
  console.log(credentialResponse);
  const tokenToDecode = credentialResponse.credential;
  const decodedToken = jwtDecode(tokenToDecode);
  console.log(decodedToken);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLoginEmail, decodedToken.email);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLoginName, decodedToken.name);
};
