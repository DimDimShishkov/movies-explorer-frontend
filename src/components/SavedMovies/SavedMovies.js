import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { MovieErrorText, NoMovies } from "../../utils/constants";

export default function SavedMovies({
  handleCardDislike,
  handleSubmitForm,
  movies,
  savedMoviesIsNotFound,
  isLoading,
  moviesErr,
  handleCheckboxStatus,
}) {
  let content;

  if (isLoading) {
    content = <Preloader isLoading={true} />;
  } else if (moviesErr) {
    content = <p className="movies-card-list__text">{MovieErrorText}</p>;
  } else if (savedMoviesIsNotFound) {
    content = <p className="movies-card-list__text">{NoMovies}</p>;
  } else {
    content = (
      <MoviesCardList
        movies={movies}
        savedMovies={movies}
        isSavedPage={true}
        handleCardLike={handleCardDislike}
      />
    );
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm
          MoviesArr={"savedMovies"}
          isLoading={isLoading}
          handleSubmitForm={handleSubmitForm}
          handleCheckboxStatus={handleCheckboxStatus}
        />
        {content}
      </main>
      <Footer />
    </>
  );
}
