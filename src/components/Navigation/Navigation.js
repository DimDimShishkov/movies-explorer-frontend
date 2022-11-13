import React, { useState } from "react";
import account from "../../images/header__account.svg";
import "./Navigation.css";

export default function Navigation({ isOpen, isLoggedIn, isStartPage }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  let content;
  if (isLoggedIn) {
    content = (
      <>
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
        <div className={`navigation ${isOpen && "navigation_active"}`}>
          <div className="navigation__links">
            <a href="#" className="navigation__link">
              Главная
            </a>
            <a href="#" className="navigation__link">
              Фильмы
            </a>
            <a href="#" className="navigation__link">
              Сохранённые фильмы
            </a>
          </div>
          <div className="navigation__account">
            <a href="#" className="navigation__account-link">
              Аккаунт
            </a>
            <div className="navigation__account-body">
              <img
                className="navigation__account-logo"
                src={account}
                alt="account"
              />
            </div>
          </div>
        </div>
      </>
    );
  } else if (isStartPage) {
    content = (
      <div className="navigation__start-page">
        <a href="/signup">Регистрация</a>
        <a href="/signin">Войти</a>
      </div>
    );
  } else {
    content = <></>;
  }

  return (
    <div className={`navigation ${isOpen && "navigation_active"}`}>
      <div className="navigation__links">
        <a href="#" className="navigation__link">
          Главная
        </a>
        <a href="#" className="navigation__link">
          Фильмы
        </a>
        <a href="#" className="navigation__link">
          Сохранённые фильмы
        </a>
      </div>
      <div className="navigation__account">
        <a href="#" className="navigation__account-link">
          Аккаунт
        </a>
        <div className="navigation__account-body">
          <img
            className="navigation__account-logo"
            src={account}
            alt="account"
          />
        </div>
      </div>
    </div>
  );
}
