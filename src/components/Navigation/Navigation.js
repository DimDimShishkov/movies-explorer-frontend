import React, { useState } from "react";
import account from "../../images/account.svg";
import "./Navigation.css";

export default function Navigation({
  isLoggedIn = false,
  isStartPage = false,
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  let content;
  if (isLoggedIn) {
    content = (
      <>
        <div className="navigation__links navigation_desktop">
          <a href="movies" className="navigation__link">
            Фильмы
          </a>
          <a href="saved-movies" className="navigation__link">
            Сохранённые фильмы
          </a>
        </div>

        <div className="navigation__account navigation_desktop">
          <a href="profile" className="navigation__account-link">
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

        <div
          className={`navigation__burger ${
            isMenuOpen ? "navigation__burger_active" : ""
          }`}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />

        <div
          className={`navigation__menu ${
            isMenuOpen && "navigation__menu_active"
          }`}
        >
          <div className="navigation__links navigation_mobile">
            <a href="/" className="navigation__link">
              Главная
            </a>
            <a href="movies" className="navigation__link">
              Фильмы
            </a>
            <a href="saved-movies" className="navigation__link">
              Сохранённые фильмы
            </a>
          </div>
          <div className="navigation__account navigation_mobile">
            <a href="profile" className="navigation__account-link">
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
      <div className="navigation">
        <a href="/signup" className="navigation__register">
          Регистрация
        </a>
        <a href="/signin" className="navigation__auth">
          Войти
        </a>
      </div>
    );
  } else {
    content = <></>;
  }

  return content;
}
