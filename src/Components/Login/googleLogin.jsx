import { jwtDecode } from "jwt-decode";
import { STORAGE_OPTIONS } from "../../Utilities/Config/storage";
import { ROUTE_PATHS } from "../../Utilities/Config/navigation";

export const googleLoginSuccess = (credentialResponse, navigate) => {
  console.log(credentialResponse);
  const tokenToDecode = credentialResponse.credential;
  const decodedToken = jwtDecode(tokenToDecode);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLoginEmail, decodedToken.email);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLoginName, decodedToken.name);
  sessionStorage.setItem(STORAGE_OPTIONS.googleLogin, true);
  return navigate(ROUTE_PATHS.dashboard);
};
