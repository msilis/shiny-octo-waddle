import style from "./register.module.css";
import classnames from "classnames";
import countries from "countries-list";
import { useRef, useState } from "react";
import Select from "react-select";

export default function Register() {
  //Refs for inputs
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const checkPasswordInput = useRef();

  //State for input checking
  const [firstNameCheck, setFirstNameCheck] = useState(false);
  const [lastNameCheck, setLastNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [userNameCheck, setUserNameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordDoubleCheck, setPasswordDoubleCheck] = useState(false);
  const [countryInput, setCountryInput] = useState("0");

  //List of countries
  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.map(
    (code) => countries.countries[code].name
  );
  const sortedCountry = countryNames.sort();
  sortedCountry.unshift("--Select Country--");
  const options = sortedCountry.map((country, index) => {
    return { value: country, label: country, key: index };
  });
  //Selection menu functionality

  function handleRegisterClick() {
    // Check input fields
    if (firstNameInput.current?.value === "") {
      setFirstNameCheck(true);
    } else if (lastNameInput.current?.value === "") {
      setLastNameCheck(true);
    } else if (emailInput.current?.value === "") {
      setEmailCheck(true);
    } else if (usernameInput.current?.value === "") {
      setUserNameCheck(true);
    } else if (passwordInput.current?.value === "") {
      setPasswordCheck(true);
    } else if (checkPasswordInput.current?.value === "") {
      setPasswordDoubleCheck(true);
    } else if (
      //Check password match
      passwordInput.current?.value != checkPasswordInput.current?.value
    ) {
      alert("Passwords do not match!");
    } else {
      const newUserData = {
        firstName: firstNameInput.current?.value,
        lastName: lastNameInput.current?.value,
        country: countryInput,
        email: emailInput.current?.value,
        userName: usernameInput.current?.value,
        password: passwordInput.current?.value,
      };
      try {
        console.log(newUserData);
        fetch("http://localhost:8080/addUser", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUserData),
        }).then((response) => {
          //Check if username already exists
          if (response.status === 409) {
            return alert(
              "That username already exists, please pick a different username."
            );
          } else {
            alert("User added sucessfully!")
            //Reset field values if submission sucessful
            firstNameInput.current.value = "";
            lastNameInput.current.value = "";
            emailInput.current.value = "";
            usernameInput.current.value = "";
            passwordInput.current.value = "";
            checkPasswordInput.current.value = "";
            //Reset any error message fields
            setFirstNameCheck(false);
            setLastNameCheck(false);
            setEmailCheck(false);
            setUserNameCheck(false);
            setPasswordCheck(false);
            setPasswordDoubleCheck(false);
            setCountryInput("0");
          }
        });
      } catch (err) {
        console.log(err);
      }
      
    }
  }

  return (
    <div
      className={classnames(style.registerContainer, style.fadeContainer)}
    >
      <h3 className={style.registerHeading}>Register</h3>
      <div className={style.inputContainer}>
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: firstNameCheck,
          })}
          placeholder="First Name"
          ref={firstNameInput}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: lastNameCheck,
          })}
          placeholder="Last Name"
          ref={lastNameInput}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: emailCheck,
          })}
          placeholder="Email"
          ref={emailInput}
        />
        <Select
          options={options}
          value={options[countryInput]}
          isSearchable={true}
          onChange={(e) => {
            console.log(e.value);
            setCountryInput(e.value);
          }}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: userNameCheck,
          })}
          placeholder="Username"
          ref={usernameInput}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: passwordCheck,
          })}
          placeholder="Password"
          type="password"
          ref={passwordInput}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: passwordDoubleCheck,
          })}
          placeholder="Confirm Password"
          type="password"
          ref={checkPasswordInput}
        />
      </div>
      <div className={style.registerButtonContainer}>
        <div className={style.registerButton} onClick={handleRegisterClick}>
          <span className={style.registerText}>Register</span>
        </div>
      </div>
    </div>
  );
}
