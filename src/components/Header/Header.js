import React, { useState, useEffect } from "react";
import logo from "../../images/header__logo.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header({ isLoggedIn = false, isStartPage = false }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let content;
  if (isStartPage) {
    content = (
      <header
        className={`header header_start ${
          scrollPosition >= 100 ? "header_overlay" : ""
        }`}
      >
        <div className="header__container">
          <a className="header__link" href="/">
            <img src={logo} alt="logo" />
          </a>
          <Navigation isLoggedIn={isLoggedIn} isStartPage={isStartPage} />
        </div>
      </header>
    );
  } else if (isLoggedIn) {
    content = (
      <header className="header header_logged">
        <a className="header__link" href="/">
          <img src={logo} alt="logo" />
        </a>
        <Navigation isLoggedIn={true} />
      </header>
    );
  } else {
    content = (
      <header className="header header_auth">
        <a className="header__link" href="/">
          <img src={logo} alt="logo" />
        </a>
      </header>
    );
  }

  return content;
}
