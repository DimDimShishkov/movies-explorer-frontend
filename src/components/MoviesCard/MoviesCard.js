import React, { useState } from "react";
import "./MoviesCard.css";

export default function MoviesCard({ movie, saved }) {
  const [isLiked, setIsLiked] = useState(false);

  const durationHandle = () => {
    let hours = ~~(movie.duration / 60);
    let mins = movie.duration % 60;
    let minsRes = mins > 0 ? `${mins}м` : "";
    return hours > 0 ? `${hours}ч${minsRes}` : `${mins}м`;
  };

  let contentButton;
  if (saved) {
    contentButton = (
      <button
        className={`movies-card__like ${
          isLiked ? "movies-card__like_active" : ""
        }`}
        onClick={() => setIsLiked(!isLiked)}
      />
    );
  } else {
    contentButton = (
      <button
        className="movies-card__delete"
      />
    );
  }

  return (
    <div className="movies-card">
      <img
        src={`https://api.nomoreparties.co${movie.image.url}`}
        alt={movie.nameRU}
        className="movies-card__image"
      />

      <div className="movies-card__container">
        <div className="movies-card__items">
          <p className="movies-card__title">{movie.nameRU}</p>
          {contentButton}
        </div>
        <p className="movies-card__subtitle">{durationHandle()}</p>
      </div>
    </div>
  );
}
