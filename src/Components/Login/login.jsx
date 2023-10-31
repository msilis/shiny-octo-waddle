import style from "./login.module.css";
import classnames from "classnames";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { handleLoginSubmit } from "./login-utils";
import Loading from "../Loading/loading";
import { STORAGE_OPTIONS } from "../../Utilities/Config/storage";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { googleLoginSuccess } from "./googleLogin";
import { showErrorToast } from "../../Utilities/toastError";
import { ERROR_MESSAGE } from "../../Utilities/Config/ui-text";

export default function Login({
  setFirstName,
  setLastName,
  setEmail,
  loggedIn,
  setLoggedIn,
  setUserId,
  setUsername,
}) {
  //Refs for inputs
  const loginUsername = useRef();
  const loginPassword = useRef();
  const navigate = useNavigate();

  //State for error handling
  const [loginError, setLoginError] = useState(null);
  //Loading state
  const [loading, setLoading] = useState(false);
  //Get login status from sessionStorage
  const loginStatus = sessionStorage.getItem(STORAGE_OPTIONS.loggedIn);

  //Login props

  const loginProps = {
    setLoginError,
    loginError,
    loginUsername,
    loginPassword,
    setLoggedIn,
    setFirstName,
    setLastName,
    setEmail,
    setUserId,
    setUsername,
    setLoading,
  };

  //If already logged in, redirect to dashboard

  function checkLoggedIn() {
    const isGoogleLoggedIn = sessionStorage.getItem(
      STORAGE_OPTIONS.googleLogin
    );
    if (loginStatus) {
      navigate("/dashboard");
    } else if (isGoogleLoggedIn) {
      console.log("Google logged in");
      navigate("/dashboard");
    }
  }

  //Enter key submits login info ================================

  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleLoginSubmit(loginProps, navigate);
    }
  }
  // Handle Logout

  const handleLogoutInternal = () => {
    setLoggedIn(false);
    if (STORAGE_OPTIONS.loggedIn) {
      sessionStorage.removeItem(STORAGE_OPTIONS.loggedIn);
    } else if (STORAGE_OPTIONS.googleLogin) {
      sessionStorage.removeItem(STORAGE_OPTIONS.googleLogin);
      sessionStorage.removeItem(STORAGE_OPTIONS.googleLoginName);
      sessionStorage.removeItem(STORAGE_OPTIONS.googleLoginEmail);
      googleLogout();
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, [loginStatus, navigate]);

  /* ======================================
  ||||||||||||||||Return|||||||||||||||||||
  ========================================= */

  return loading ? (
    <Loading />
  ) : (
    <div className={classnames(style.loginContainer, style.fadeContainer)}>
      <h3 className={style.loginHeading}>
        {sessionStorage.getItem(STORAGE_OPTIONS.loggedIn) ||
        sessionStorage.getItem(STORAGE_OPTIONS.googleLogin)
          ? "User already logged in"
          : "Log In"}
      </h3>
      <div
        className={classnames(style.loginInputContainer, {
          [style.userLoggedIn]: loginStatus,
        })}
      >
        <input
          placeholder="Username"
          ref={loginUsername}
          className={style.loginInput}
          data-testid="usernameInput"
        ></input>
        <input
          placeholder="Password"
          ref={loginPassword}
          className={style.loginInput}
          type="password"
          onKeyDown={handleEnterKey}
          data-testid="passwordInput"
        ></input>
        <div
          className={style.loginButton}
          onClick={() => handleLoginSubmit(loginProps, navigate)}
          data-testid="loginButton"
        >
          {/* TODO: remove this and replace with string from ui text object */}
          <span>Log In</span>
        </div>
      </div>
      <div
        className={loggedIn ? style.loginButton : style.userLoggedIn}
        onClick={handleLogoutInternal}
      >
        <span>Log out</span>
      </div>
      <div className={style.googleLoginContainer}>
        <GoogleLogin
          onSuccess={(credentialResponse) =>
            googleLoginSuccess(credentialResponse, navigate, loginProps)
          }
          onError={(error) => {
            showErrorToast(ERROR_MESSAGE.failedLogin);
            console.log(ERROR_MESSAGE.failedLogin, error);
          }}
        />
      </div>
    </div>
  );
}
