import React, { useState } from "react";
import logo from "./images/logo.png";
import loaderBlanco from "./images/loaderBlanco.svg";
var texts = require("./data/texts");

export default function Login(props) {
  const [loginLoader, setLoginLoader] = useState(false);
  return (
    <div className="mainRoute login">
      <div className="logo">
        <img className="logoImg" src={logo} alt="logo" />
        <div className="logoTagline">{texts.TAGLINE}</div>
      </div>
      <div className="loginContainer">
        {!loginLoader && (
          <>
            <input type="text" placeholder={texts.USER_PLACEHOLDER} />
            <button
              className="block login"
              onClick={() => {
                setLoginLoader(true);
              }}
            >
              {texts.ENTER}
            </button>
            <div className="divider"></div>
            <button className="block login">{texts.CREATE_ACCOUNT}</button>
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
