import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__section">
        <p className="portfolio__heading">Портфолио</p>
        <ul className="portfolio__items">
          <li className="portfolio__item">
            <a
              href="https://github.com/DimDimShishkov/Lubimovka"
              target="_blank"
              className="portfolio__link"
              rel="noreferrer"
            >
              <p className="portfolio__subheading">
                Групповой проект "Любимовка"
              </p>
              <p className="portfolio__arrow">↗</p>
            </a>
          </li>
          <li className="portfolio__item">

          <a
              href="https://github.com/DimDimShishkov/dumpling-redux"
              target="_blank"
              className="portfolio__link"
              rel="noreferrer"
            >
              <p className="portfolio__subheading">
                Проект "Хинкальная" на Redux"
              </p>
              <p className="portfolio__arrow">↗</p>
            </a>

          </li>
          <li className="portfolio__item">

          <a
              href="https://github.com/DimDimShishkov/react-mesto-api-full"
              target="_blank"
              className="portfolio__link"
              rel="noreferrer"
            >
              <p className="portfolio__subheading">
                Проект "Mesto" на React с авторизацией и регистрацией"
              </p>
              <p className="portfolio__arrow">↗</p>
            </a>

          </li>
        </ul>
      </div>
    </section>
  );
}
