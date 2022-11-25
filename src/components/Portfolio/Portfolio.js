import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__section">
        <p className="portfolio__heading">Портфолио</p>
        <ul className="portfolio__items">
          <li className="portfolio__item">
            <p className="portfolio__subheading">
              {/* Групповой проект "Любимовка" */}
              Статичный сайт
            </p>
            <a
              href="https://github.com/DimDimShishkov/Lubimovka"
              target="_blank"
              className="portfolio__arrow"
              rel="noreferrer"
            >
              ↗
            </a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__subheading">
              {/* Проект "Хинкальная" на Redux */}
              Адаптивный сайт
            </p>
            <a
              href="https://github.com/DimDimShishkov/dumpling-redux"
              target="_blank"
              rel="noreferrer"
              className="portfolio__arrow"
            >
              ↗
            </a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__subheading">
              {/* Проект "Mesto" на React с авторизацией и регистрацией */}
              Одностраничное приложение
            </p>
            <a
              href="https://github.com/DimDimShishkov/react-mesto-api-full"
              target="_blank"
              rel="noreferrer"
              className="portfolio__arrow"
            >
              ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
