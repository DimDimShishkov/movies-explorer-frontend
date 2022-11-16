import React from "react";
import "./Promo.css";
import logo from "../../images/promo__logo.png";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__section">
        <div className="promo__content">
          <div className="promo__texts">
            <h1 className="promo__title">
              Учебный проект студента факультета <nobr>Веб-разработки</nobr>.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
          </div>
          <img src={logo} alt="логотип" className="promo__logo" />
        </div>
        <div className="promo__container">
          <a href="#" className="promo__link">
            Узнать больше
          </a>
        </div>
      </div>
    </section>
  );
}
