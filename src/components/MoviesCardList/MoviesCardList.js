import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, saved }) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__section">
        {movies?.map((item) => (
          <MoviesCard movie={item} key={item.id} saved={saved} />
        ))}
      </div>
    </section>
  );
}
