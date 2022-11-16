import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__section">
        <p className="portfolio__heading">Портфолио</p>
        <a href="www.123.com" className="portfolio__container">
          <p className="portfolio__subheading">Статичный сайт</p>
          <p className="portfolio__arrow">↗</p>
        </a>
        <span className="portfolio__line" />
        <a href="www.123.com" className="portfolio__container">
          <p className="portfolio__subheading">Адаптивный сайт</p>
          <p className="portfolio__arrow">↗</p>
        </a>
        <span className="portfolio__line" />
        <a href="www.123.com" className="portfolio__container">
          <p className="portfolio__subheading">Одностраничное приложение</p>
          <p className="portfolio__arrow">↗</p>
        </a>
      </div>
    </section>
  );
}
