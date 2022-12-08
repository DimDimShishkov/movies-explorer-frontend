import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({ movie, saved, isLiked, handleCardLike }) {
  let imageSource;
  let contentButton;

  const durationHandle = () => {
    let hours = ~~(movie.duration / 60);
    let mins = movie.duration % 60;
    let minsRes = mins > 0 ? `${mins}м` : "";
    return hours > 0 ? `${hours}ч${minsRes}` : `${mins}м`;
  };

  if (!saved) {
    imageSource = (
      <img
        src={`https://api.nomoreparties.co${movie.image.url}`}
        alt={movie.nameRU}
        className="movies-card__image"
      />
    );
    contentButton = (
      <button
        className={`movies-card__like ${
          isLiked ? "movies-card__like_active" : ""
        }`}
        onClick={() => handleCardLike(movie, isLiked)}
      />
    );
  } else {
    imageSource = <img
    src={movie.image}
    alt={movie.nameRU}
    className="movies-card__image"
  />
    contentButton = <button className="movies-card__delete" 
    onClick={() => handleCardLike(movie, saved)}
    />;
  }

  return (
    <div className="movies-card" onClick={() => console.log(movie)}>
      {imageSource}

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
