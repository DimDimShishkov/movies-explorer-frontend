import React, { useState } from "react";
import logo from "../../images/header__logo.svg";
import account from "../../images/header__account.svg";
import Navigation from "../Navigation/Navigation";

export default function Header({isLoggedIn, isStartPage}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <section className="header">
      <img src={logo} alt="logo"></img>
      <div className="header__links header__desktop">
        <a href="#" className="header__link">
          Фильмы
        </a>
        <a href="#" className="header__link">
          Сохранённые фильмы
        </a>
      </div>
      <div className="header__account header__desktop">
        <a href="#" className="header__account-link">
          Аккаунт
        </a>
        <div className="header__account-body">
          <img className="header__account-logo" src={account} alt="account" />
        </div>
      </div>
      <div
        className={`header__burger ${
          isMenuOpen ? "header__burger_active" : ""
        }`}
        onClick={() => setMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && <Navigation isOpen={isMenuOpen}/>}
    </section>
  );
}
