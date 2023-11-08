import style from "./register.module.css";
import classnames from "classnames";
import countries from "countries-list";
import { useRef, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router";
import { showSuccessToast } from "../../Utilities/toastSuccess";
import { showErrorToast } from "../../Utilities/toastError";
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PLACEHOLDER_TEXT,
  TOAST_TEXT,
} from "../../Utilities/Config/ui-text";
import { ROUTE_PATHS } from "../../Utilities/Config/navigation";

export default function Register() {
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const checkPasswordInput = useRef();
  const [firstNameCheck, setFirstNameCheck] = useState(false);
  const [lastNameCheck, setLastNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [userNameCheck, setUserNameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordDoubleCheck, setPasswordDoubleCheck] = useState(false);
  const [countryInput, setCountryInput] = useState("0");

  const navigate = useNavigate();

  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.map(
    (code) => countries.countries[code].name
  );
  const sortedCountry = countryNames.sort();
  sortedCountry.unshift(PLACEHOLDER_TEXT.countryPlaceholder);
  const options = sortedCountry.map((country, index) => {
    return { value: country, label: country, key: index };
  });

  function handleRegisterClick() {
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
      passwordInput.current?.value != checkPasswordInput.current?.value
    ) {
      showErrorToast(ERROR_MESSAGE.passwordsDoNotMatch);
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
        fetch("https://group-class-backend.onrender.com/addUser", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUserData),
        }).then((response) => {
          if (response.status === 409) {
            return showErrorToast(ERROR_MESSAGE.usernameAlreadyExists);
          } else {
            showSuccessToast(TOAST_TEXT.userAddedSuccess);
            firstNameInput.current.value = "";
            lastNameInput.current.value = "";
            emailInput.current.value = "";
            usernameInput.current.value = "";
            passwordInput.current.value = "";
            checkPasswordInput.current.value = "";
            setFirstNameCheck(false);
            setLastNameCheck(false);
            setEmailCheck(false);
            setUserNameCheck(false);
            setPasswordCheck(false);
            setPasswordDoubleCheck(false);
            setCountryInput("0");
            navigate(ROUTE_PATHS.login);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className={classnames(style.registerContainer, style.fadeContainer)}>
      <h3 className={style.registerHeading}>{BUTTON_TEXT.registerButton}</h3>
      <div className={style.inputContainer}>
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: firstNameCheck,
          })}
          placeholder={PLACEHOLDER_TEXT.firstNamePlaceholder}
          ref={firstNameInput}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: lastNameCheck,
          })}
          placeholder={PLACEHOLDER_TEXT.lastNamePlaceholder}
          ref={lastNameInput}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: emailCheck,
          })}
          placeholder={PLACEHOLDER_TEXT.emailPlaceholder}
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
          placeholder={PLACEHOLDER_TEXT.passwordPlaceholder}
          type="password"
          ref={passwordInput}
        />
        <input
          className={classnames(style.registerInput, {
            [style.registerInputError]: passwordDoubleCheck,
          })}
          placeholder={PLACEHOLDER_TEXT.confirmPasswordPlaceholder}
          type="password"
          ref={checkPasswordInput}
        />
      </div>
      <div className={style.registerButtonContainer}>
        <div className={style.registerButton} onClick={handleRegisterClick}>
          <span className={style.registerText}>
            {BUTTON_TEXT.registerButton}
          </span>
        </div>
      </div>
    </div>
  );
}
