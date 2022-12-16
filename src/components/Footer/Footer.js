import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line" />
      <div className="footer__content">
        <p className="footer__item">© 2022</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/DimDimShishkov" className="footer__link">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
