import React from "react";
import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__section">
        <h2 className="techs__title">Технологии</h2>
        <span className="techs__line" />
        <div className="techs__items">
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__description">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>

          <div className="techs__containers">
            <div className="techs__container">
              <p className="techs__text">HTML</p>
            </div>
            <div className="techs__container">
              <p className="techs__text">CSS</p>
            </div>
            <div className="techs__container">
              <p className="techs__text">JS</p>
            </div>
            <div className="techs__container">
              <p className="techs__text">React</p>
            </div>
            <div className="techs__container">
              <p className="techs__text">Git</p>
            </div>
            <div className="techs__container">
              <p className="techs__text">Express.js</p>
            </div>
            <div className="techs__container">
              <p className="techs__text">mongoDB</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
