import style from "./login.module.css";
import classnames from "classnames";
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  //Refs for inputs
  const loginUsername = useRef();
  const loginPassword = useRef();

  const navigate = useNavigate();

  //Handle login button click

  function handleLoginSubmit() {
    const loginData = {
      userName: loginUsername.current?.value,
      password: loginPassword.current?.value,
    };
    if (sessionStorage.getItem("loggedIn") === null) {
      try {
        fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginData),
        }).then((response) => {
          if (response.status === 401) {
            alert("Incorrect Username or Password!");
          } else {
            sessionStorage.setItem("loggedIn", true);
            console.log("User logged in.");
            return navigate("/");
          }
        });
        loginUsername.current.value = "";
        loginPassword.current.value = "";
      } catch (err) {
        console.log(err);
      }
    } else {
      loginUsername.current.value = "";
      loginPassword.current.value = "";
      console.log("user already logged in");
    }
  }

  function handleLogout(){
    console.log('Logged out')
    sessionStorage.removeItem('loggedIn')
  }

  const loginStatus = sessionStorage.getItem('loggedIn');
  console.log(loginStatus)

  return (
    <div className={classnames(style.loginContainer, style.fadeContainer)}>
      <h3 className={style.loginHeading}>{sessionStorage.getItem("loggedIn") ? 'User already logged in' : 'Log In'  }</h3>
      <div className={classnames(style.loginInputContainer, {[style.userLoggedIn]: loginStatus})}>
        <input
          placeholder="Username"
          ref={loginUsername}
          className={style.loginInput}
        ></input>
        <input
          placeholder="Password"
          ref={loginPassword}
          className={style.loginInput}
          type="password"
        ></input>
        <div className={style.loginButton} onClick={handleLoginSubmit}>
          <span>Log In</span>
        </div>
      </div>
      
    </div>
  );
}
