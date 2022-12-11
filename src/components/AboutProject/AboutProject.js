import React from "react";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <span className="about-project__line" />
      <div className="about-project__containers">
        <div className="about-project__container">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__container">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__progress-bar">
        <div className="about-project__progress about-project__progress-backend">
          <div className="about-project__backend">
            <p className="about-project__backend-text">1 неделя</p>
          </div>
          <p className="about-project__progress-text">Back-end</p>
        </div>
        <div className="about-project__progress about-project__progress-frontend">
          <div className="about-project__frontend">
            <p className="about-project__frontend-text">4 недели</p>
          </div>
          <p className="about-project__progress-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}
