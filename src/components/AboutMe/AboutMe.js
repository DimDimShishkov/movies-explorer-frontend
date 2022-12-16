import React from "react";
import "./AboutMe.css";
import avatar from "../../images/avatar.jfif";

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__section">
        <h2 className="about-me__title">Студент</h2>
        <span className="about-me__line" />
        <div className="about-me__items">
          <div className="about-me__info">
            <h3 className="about-me__subtitle">Дима Шишков</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">
              Родился в Башкирии, получил высшее образование в Екатеринбурге.
              Первое место работы было за 14км от полярного круга в поселке
              Заполярный. Женился в Москве и сейчас нахожусь в Ереване. Люблю
              путешествовать и увлекаюсь бегом. С января 2022 года прохожу курс
              по веб-разработке на платформе Яндекс.Практикум и сейчас ищу
              интересные проекты.
            </p>
            <a
              href="https://github.com/DimDimShishkov"
              className="about-me__link"
            >
              Github
            </a>
          </div>
          <img
            className="about-me__avatar"
            alt="DimDimShishkov"
            src={avatar}
          ></img>
        </div>
      </div>
    </section>
  );
}
