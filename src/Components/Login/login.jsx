import style from "./login.module.css";
import classnames from "classnames";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

//Exports for testing

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
  //Get login status from sessionStorage
  const loginStatus = sessionStorage.getItem("loggedIn");

  //Handle login button click =============================================================

  function handleLoginSubmit() {
    setLoginError(null);
    const loginData = {
      userName: loginUsername.current?.value,
      password: loginPassword.current?.value,
    };
    if (sessionStorage.getItem("loggedIn") === null) {
      fetch("http://localhost:8080/login", {
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
            alert("Incorrect Username or Password!");
            throw new Error("Incorrect username or password.");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setLoggedIn(true);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setUserId(data.userId);
          setUsername(data.username);
          sessionStorage.setItem("loggedIn", true);
          const userInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            userId: data.userId,
          };
          sessionStorage.setItem("user", JSON.stringify(userInfo));
          console.log("User logged in.");
          //Redirect user after sucessful login
          return navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);
          /* setLoginError(err.message); */
          toast.error("There was a network error. You are not logged in.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        });
      loginUsername.current.value = "";
      loginPassword.current.value = "";
    }
  }

  //If already logged in, redirect to dashboard

  function checkLoggedIn() {
    const isLoggedIn = sessionStorage.getItem("loggedIn");
    if (isLoggedIn) {
      console.log(sessionStorage.getItem("loggedIn"));
      navigate("/dashboard");
    }
  }

  //Enter key submits login info ================================

  function handleEnterKey(event) {
    if (event.key === "Enter") {
      console.log(event.key);
      handleLoginSubmit();
    }
  }
  // Handle Logout

  const handleLogoutInternal = () => {
    setLoggedIn(false);
    console.log("Logged out");
    sessionStorage.removeItem("loggedIn");
  };

  useEffect(() => {
    console.log("effect ran");
    checkLoggedIn();
  }, []);

  /* ======================================
  ||||||||||||||||Return|||||||||||||||||||
  ========================================= */

  return (
    <div className={classnames(style.loginContainer, style.fadeContainer)}>
      <h3 className={style.loginHeading}>
        {sessionStorage.getItem("loggedIn")
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
          onClick={handleLoginSubmit}
          data-testid="loginButton"
        >
          <span>Log In</span>
        </div>
      </div>
      <div
        className={loggedIn ? style.loginButton : style.userLoggedIn}
        onClick={handleLogoutInternal}
      >
        <span>Log out</span>
      </div>
    </div>
  );
}
