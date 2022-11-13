import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line" />
      <div className="footer__content">
        <p className="footer__item">© 2020</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__item">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/" className="footer__item">
            Github
          </a>
        </div>
      </div>
    </section>
  );
}
