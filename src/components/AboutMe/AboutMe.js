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
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
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
