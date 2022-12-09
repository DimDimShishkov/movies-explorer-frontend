import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import account from "../../images/account.svg";
import "./Navigation.css";

export default function Navigation({
  isLoggedIn = false,
  isStartPage = false,
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const activeMobileStyle = {
    borderBottom: "2px solid #FFFFFF",
    lineHeight: "26px",
  };

  const activeDesktopStyle = {
    fontWeight: "500",
  };

  let content;
  if (isLoggedIn) {
    content = (
      <>
        <div className="navigation__links navigation_desktop">
          <NavLink
            to="/movies"
            className="navigation__link"
            style={({ isActive }) =>
              isActive ? activeDesktopStyle : undefined
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link"
            style={({ isActive }) =>
              isActive ? activeDesktopStyle : undefined
            }
          >
            Сохранённые фильмы
          </NavLink>
        </div>

        <div className="navigation__account navigation_desktop">
          <NavLink to="/profile" className="navigation__account-link">
            Аккаунт
          </NavLink>
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
            <NavLink
              to="/movies"
              className="navigation__link"
              style={({ isActive }) =>
                isActive ? activeMobileStyle : undefined
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="navigation__link"
              style={({ isActive }) =>
                isActive ? activeMobileStyle : undefined
              }
            >
              Сохранённые фильмы
            </NavLink>
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
  } else if (isStartPage && !isLoggedIn) {
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
