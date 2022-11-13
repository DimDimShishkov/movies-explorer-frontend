import React from "react";
import "./NoPage.css"

export default function NoPage() {
  return (
    <section className="main">
      <div className="nopage">
        <h1 className="nopage__title">404</h1>
        <h2 className="nopage__subtitle">Страница не найдена.</h2>
        <button className="nopage__button">Назад</button>
      </div>
    </section>
  );
}
