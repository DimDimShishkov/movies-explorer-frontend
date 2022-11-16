import React, { useState } from "react";
import logo from "../../images/header__logo.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header({ isLoggedIn = false, isStartPage = false }) {
  let content;
  if (isStartPage) {
    content = (
      <section className="header header_start">
        <img src={logo} alt="logo"></img>
        <Navigation isStartPage={true} />
      </section>
    );
  } else if (isLoggedIn) {
    content = (
      <section className="header header_logged">
        <img src={logo} alt="logo" />
        <Navigation isLoggedIn={true} />
      </section>
    );
  } else {
    content = (
      <section className="header header_auth">
        <img src={logo} alt="logo" />
      </section>
    );
  }

  return content;
}
