import { callLogin } from "./callLogin";
import { STORAGE_OPTIONS } from "../../Utilities/Config/storage";

const handleLoginSubmit = (loginProps, navigate) => {
  loginProps.setLoginError(null);
  loginProps.setLoading(true);

  if (sessionStorage.getItem(STORAGE_OPTIONS.loggedIn) === null) {
    callLogin(loginProps, navigate);
  }
  loginProps.loginUsername.current.value = "";
  loginProps.loginPassword.current.value = "";
};

export { handleLoginSubmit };
