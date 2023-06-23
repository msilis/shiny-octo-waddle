import { callLogin } from "./callLogin";

const handleLoginSubmit = (loginProps, navigate) => {
  loginProps.setLoginError(null);
  loginProps.setLoading(true);

  if (sessionStorage.getItem("loggedIn") === null) {
    callLogin(loginProps, navigate);
  }
  loginProps.loginUsername.current.value = "";
  loginProps.loginPassword.current.value = "";
};

export { handleLoginSubmit };
