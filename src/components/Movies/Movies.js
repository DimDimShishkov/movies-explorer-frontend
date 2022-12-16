import React from "react";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { MovieErrorText, NoMovies } from "../../utils/constants";

export default function Movies({
  handleSubmitForm,
  movies,
  moviesIsNotFound,
  isLoading,
  moviesErr,
  handleCardLike,
  handleCheckboxStatus,
}) {
  let content;
  let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));

  if (isLoading) {
    content = <Preloader isLoading={true} />;
  } else if (moviesErr) {
    content = <p className="movies-card-list__text">{MovieErrorText}</p>;
  } else if (moviesIsNotFound) {
    content = <p className="movies-card-list__text">{NoMovies}</p>;
  } else {
    content = (
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        moviesErr={moviesErr}
        isSavedPage={false}
        handleCardLike={handleCardLike}
      />
    );
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm
          MoviesArr={"movies"}
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
