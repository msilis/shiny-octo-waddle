import style from "./register.module.css";
import classnames from "classnames";
import countries from "countries-list";
import { useRef, useState } from "react";

export default function Register() {
  //Refs for inputs
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const countryInput = useRef();
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

  // TODO List of countries for dropdown
  //List of countries
  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.map(
    (code) => countries.countries[code].name
  );
  const sortedCountry = countryNames.sort();
  const mappedCountries = sortedCountry.map((country) => {
    return (
      <option value={country} key={country}>
        {country}
      </option>
    );
  });

  function handleRegisterClick() {
    // TODO Check if there are any empty input fields
        if(firstNameInput.current?.value === ""){
           setFirstNameCheck(true);
        }else
        if(lastNameInput.current?.value === ""){
            setLastNameCheck(true);
        }else
        if(emailInput.current?.value === ""){
            setEmailCheck(true);
        }else
        if(usernameInput.current?.value === ""){
            setUserNameCheck(true);
        }else
        if(passwordInput.current?.value === ""){
            setPasswordCheck(true);
        }else
        if(checkPasswordInput.current?.value === ""){
            setPasswordDoubleCheck(true);
        }else if(passwordInput.current?.value != checkPasswordInput.current?.value){
            alert("Passwords do not match!")
        }else{
            console.log("got to here sucessfully")
            
        }
    // TODO Check if passwords match
  }

  return (
    <div className={classnames(style.registerContainer, style.fadeContainer, {})}>
      <h3 className={style.registerHeading}>Register</h3>
      <div className={style.inputContainer}>
        <input
          className={classnames(style.registerInput, {[style.registerInputError]: firstNameCheck})}
          placeholder="First Name"
          ref={firstNameInput}
        />
        <input
          className={classnames(style.registerInput, {[style.registerInputError]: lastNameCheck})}
          placeholder="Last Name"
          ref={lastNameInput}
        />
        <input
          className={classnames(style.registerInput, {[style.registerInputError]: emailCheck})}
          placeholder="Email"
          ref={emailInput}
        />
        <select name="country" className={classnames(style.countries)} ref={countryInput}>
          {mappedCountries}
        </select>
        <input
          className={classnames(style.registerInput, {[style.registerInputError]: userNameCheck})}
          placeholder="Username"
          ref={usernameInput}
        />
        <input
          className={classnames(style.registerInput, {[style.registerInputError]: passwordCheck})}
          placeholder="Password"
          type="password"
          ref={passwordInput}
        />
        <input
          className={classnames(style.registerInput, {[style.registerInputError]: passwordDoubleCheck})}
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
