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
  const [countryInput, setCountryInput] = useState("");

  //List of countries
  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.map(
    (code) => countries.countries[code].name
  );
  const sortedCountry = countryNames.sort();

  const options = sortedCountry.map((country, index) => {
    return { value: country[index], label: country, key: index };
  });
  //Selection menu functionality
  // TODO Sort out dropdown menu

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
      console.log("got to here sucessfully");
      //Reset field values
      firstNameInput.current.value = "";
      lastNameInput.current.value = "";
      emailInput.current.value = "";
      usernameInput.current.value = "";
      passwordInput.current.value = "";
      checkPasswordInput.current.value = "";
      setCountryInput(" ");
    }
  }

  return (
    <div
      className={classnames(style.registerContainer, style.fadeContainer, {})}
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
          defaultValue={options[236]}
          isSearchable={true}
          onChange={(e) => setCountryInput(e.target)}
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
