import React, { useState } from "react";
import logo from "../images/header__logo.svg";
import account from "../images/header__account.svg";

export default function Header() {
const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <section className="header">
      <img src={logo} alt="logo"></img>
      <div className="header__links header__links_desktop">
        <a href="#" className="header__link">
          Фильмы
        </a>
        <a href="#" className="header__link">
          Сохранённые фильмы
        </a>
      </div>
      <div className="header__account header__account_desktop">
        <a href="#" className="header__account-link">
          Аккаунт
        </a>
        <div className="header__account-body">
          <img
            className="header__account-logo"
            src={account}
            alt="account"
          />
        </div>
      </div>
      <div className={`header__burger ${isMenuOpen ? "header__burger_active" : ""}`} onClick={() => setMenuOpen(true)}/>
      <div className="header__menu_mobile">
        <div className="header__links header__links_mobile">
          <a href="#" className="header__link">
            Главная
          </a>
          <a href="#" className="header__link">
            Фильмы
          </a>
          <a href="#" className="header__link">
            Сохранённые фильмы
          </a>
        </div>
        <div className="header__account header__account_mobile">
          <a href="#" className="header__account-link">
            Аккаунт
          </a>
          <div className="header__account-body">
            <img
              className="header__account-logo"
              src={account}
              alt="accountLogo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
