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

import {
  ERROR_MESSAGE,
  PAGE_TEXT,
  PLACEHOLDER_TEXT,
} from "../../Utilities/Config/ui-text";
import { ROUTE_PATHS } from "../../Utilities/Config/navigation";

export default function Login({
  setFirstName,
  setLastName,
  setEmail,
  loggedIn,
  setLoggedIn,
  setUserId,
  setUsername,
  setGoogleName,
  displayName,
  setDisplayName,
}) {
  const loginUsername = useRef();
  const loginPassword = useRef();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginStatus = sessionStorage.getItem(STORAGE_OPTIONS.loggedIn);

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
    setGoogleName,
    displayName,
    setDisplayName,
  };

  function checkLoggedIn() {
    const isGoogleLoggedIn = sessionStorage.getItem(
      STORAGE_OPTIONS.googleLogin
    );
    if (loginStatus) {
      navigate(ROUTE_PATHS.dashboard);
    } else if (isGoogleLoggedIn) {
      navigate(ROUTE_PATHS.dashboard);
    }
  }

  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleLoginSubmit(loginProps, navigate);
    }
  }

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
          placeholder={PLACEHOLDER_TEXT.usernamePlaceholder}
          ref={loginUsername}
          className={style.loginInput}
          data-testid="usernameInput"
        ></input>
        <input
          placeholder={PLACEHOLDER_TEXT.passwordPlaceholder}
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
          <span>{PAGE_TEXT.loginText}</span>
        </div>
      </div>
      <div
        className={loggedIn ? style.loginButton : style.userLoggedIn}
        onClick={handleLogoutInternal}
      >
        <span>{PAGE_TEXT.logoutText}</span>
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
