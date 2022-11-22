import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({ movie }) {
  return (
    <div className="movies-card">
      <img
        src={movie.image}
        alt={movie.nameRU}
        className="movies-card__image"
      />
      <div className="movies-card__container">
        <p className="movies-card__title">{movie.nameRU}</p>
        <button className="movies-card__like"/>
      </div>
      <p className="movies-card__subtitle">{movie.duration}</p>
    </div>
  );
}
