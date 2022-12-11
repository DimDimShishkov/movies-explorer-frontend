import React, { useEffect } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  handleCardDislike,
  handleSubmitForm,
  movies,
  moviesIsNotFound,
  isLoading,
  moviesErr,
  handleCheckboxStatus,
}) {
  let content;
  // убрать
  /*   useEffect(() => {
    handleUploadSavedMovies();
  }, [handleUploadSavedMovies]); */
  let savedMoviesFound = JSON.parse(localStorage.getItem("savedMoviesFound"));
  useEffect(() => {
    if (!savedMoviesFound) {
      content = <></>;
    }
  }, []);

  if (!!savedMoviesFound) {
    content = (
      <MoviesCardList
        movies={savedMoviesFound}
        savedMovies={movies}
        isSavedPage={true}
        handleCardLike={handleCardDislike}
      />
    );
  } else if (isLoading) {
    content = <Preloader isLoading={true} />;
  } else if (moviesErr) {
    content = (
      <p className="movies-card-list__text">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </p>
    );
  } else if (moviesIsNotFound) {
    content = <p className="movies-card-list__text">Ничего не найдено</p>;
  } else if (movies?.length > 0) {
    content = (
      <MoviesCardList
        movies={movies}
        savedMovies={movies}
        isSavedPage={true}
        handleCardLike={handleCardDislike}
      />
    );
  } else {
    content = <></>;
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm
          MoviesArr={"savedMovies"}
          handleSubmitForm={handleSubmitForm}
          handleCheckboxStatus={handleCheckboxStatus}
        />
        {content}
      </main>
      <Footer />
    </>
  );
}
