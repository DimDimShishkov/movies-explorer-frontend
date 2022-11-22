import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

export default function SavedMovies() {
  return (
    <>
      <Header isLoggedIn={true} />
      <section className="saved-movies">
        <div className="saved-movies__section">
          <SearchForm />
          <Preloader />
          <MoviesCardList />
        </div>
      </section>
    </>
  );
}
