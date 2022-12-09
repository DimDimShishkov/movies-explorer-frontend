import React, { useEffect } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  handleCardDislike,
  handleSubmitForm,
  handleUploadSavedMovies,
  movies,
  isLoading,
  moviesErr,
  filteredMovies,
  handleCheckboxStatus,
}) {
  let content;

  // убрать
  /*   useEffect(() => {
    handleUploadSavedMovies();
  }, [handleUploadSavedMovies]); */

  if (isLoading) {
    content = <Preloader isLoading={true} />;
  } else if (moviesErr) {
    content = (
      <p className="movies-card-list__text">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </p>
    );
  } else if (movies?.length === 0) {
    content = <p className="movies-card-list__text">Ничего не найдено</p>;
  } else if (movies?.length > 0) {
    content = (
      <MoviesCardList
        movies={movies}
        savedMovies={movies}
        filteredMovies={filteredMovies}
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
          movies={"savedMovies"}
          handleSubmitForm={handleSubmitForm}
          handleCheckboxStatus={handleCheckboxStatus}
        />
        {content}
      </main>
      <Footer />
    </>
  );
}
