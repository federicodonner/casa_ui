import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import loaderBlanco from "./images/loaderBlanco.svg";
import { accessAPI, storeInLS } from "./utils/fetchfunctions";
var texts = require("./data/texts");

export default function Login(props) {
  const [loginLoader, setLoginLoader] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [verifyUsernameStatus, setVerifyUsernameStatus] = useState(0);
  const [createUserButtonEnabled, setCreateUserButtonEnabled] = useState(false);
  // Username status:
  // 0 - no symbol
  // 1 - loader
  // 2 - OK
  // 3 - Error

  const createUsernameRef = useRef(null);
  const createNameRef = useRef(null);
  const loginRef = useRef(null);

  let navigate = useNavigate();

  // Function run when creating new user
  // verifies that the username selected is correct and is not repeated
  function verifyUsernameWithAPI() {
    // Turns on the loader
    setVerifyUsernameStatus(1);
    // Verifies that there are no spaces in the username
    if (createUsernameRef.current.value.indexOf(" ") !== -1) {
      setVerifyUsernameStatus(3);
      return;
    }
    // If there are no spaces, checks with the API
    accessAPI(
      "POST",
      "usuario/verify",
      { username: createUsernameRef.current.value },
      (response) => {
        // If the name is available, show the icon
        setVerifyUsernameStatus(2);
        // Sets the enabled state of the accept button
        if (createNameRef.current.value) {
          setCreateUserButtonEnabled(true);
        }
      },
      (response) => {
        // If there is a problem with the username, show the icon
        setVerifyUsernameStatus(3);
        // Sets the enabled state of the accept button
        setCreateUserButtonEnabled(false);
      }
    );
  }

  // Function runs when the user name is updated
  // Enables or disables the submit button
  function updateName() {
    if (createNameRef.current.value && verifyUsernameStatus === 2) {
      setCreateUserButtonEnabled(true);
    } else {
      setCreateUserButtonEnabled(false);
    }
  }

  // Function that runs when the new user form is submitted
  function submitCreateUser() {
    // If the form conditions arent met, it doesn't submit
    if (createUserButtonEnabled) {
      // Turns on the loader
      setLoginLoader(true);
      // Creates the user
      accessAPI(
        "POST",
        "usuario",
        {
          username: createUsernameRef.current.value,
          nombre: createNameRef.current.value,
        },
        // Store the token in LS and navigate
        (response) => {
          storeInLS("casaToken", response.token);
          navigate("/home");
        },
        // If the API responds with an error, it shows the error
        (response) => {
          setVerifyUsernameStatus(0);
          setLoginLoader(false);
          alert(response.message);
        }
      );
    }
  }

  return (
    <div className="mainRoute login">
      <div className="logo">
        <img className="logoImg" src={logo} alt="logo" />
        <div className="logoTagline">{texts.TAGLINE}</div>
      </div>
      <div className="loginContainer">
        {!loginLoader && !isCreatingUser && (
          <>
            <input
              type="text"
              placeholder={texts.USER_PLACEHOLDER}
              ref={loginRef}
            />
            <button
              className="block login"
              onClick={() => {
                setLoginLoader(true);
              }}
            >
              {texts.ENTER}
            </button>
            <div className="divider"></div>
            <button
              className="block login"
              onClick={() => {
                setIsCreatingUser(true);
              }}
            >
              {texts.CREATE_ACCOUNT}
            </button>
          </>
        )}
        {!loginLoader && isCreatingUser && (
          <>
            <div className="title">{texts.CREATE_ACCOUNT}</div>
            <div className="createAccountUsername">
              <input
                type="text"
                ref={createUsernameRef}
                onChange={verifyUsernameWithAPI}
                placeholder={texts.USER_PLACEHOLDER}
              />
              <div className="verifyUsernameStatusContainer">
                {verifyUsernameStatus === 1 && (
                  <img src={loaderBlanco} alt="loader" />
                )}
                {verifyUsernameStatus === 2 && (
                  <i className="fas fa-check-circle"></i>
                )}
                {verifyUsernameStatus === 3 && (
                  <i className="fas fa-times-circle"></i>
                )}
              </div>
            </div>
            <input
              type="text"
              placeholder={texts.NAME_PLACEHOLDER}
              ref={createNameRef}
              onChange={updateName}
            />
            <button
              className={
                createUserButtonEnabled ? "block login" : "block login disabled"
              }
              onClick={submitCreateUser}
            >
              {texts.ACCEPT}
            </button>
            <div className="divider"></div>
            <button
              className="block login"
              onClick={() => {
                setIsCreatingUser(false);
              }}
            >
              {texts.CANCEL}
            </button>
          </>
        )}
        {loginLoader && (
          <div className="loaderContainer">
            <img src={loaderBlanco} alt="loader" />
          </div>
        )}
      </div>
      <div className="disclaimer">{texts.DISCLAIMER}</div>
    </div>
  );
}
