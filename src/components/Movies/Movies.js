import React, { useCallback, useEffect, useMemo, useState } from "react";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({
  handleSubmitForm,
  movies,
  savedMovies,
  isLoading,
  moviesErr,
  handleCardLike,
  handleCheckboxStatus,
}) {
  let content;
  let moviesFound = JSON.parse(localStorage.getItem("moviesFound"));

  useEffect(() => {
    if (!moviesFound) {
      content = <></>;
    } else {
      content = (
        <MoviesCardList
          movies={moviesFound}
          savedMovies={savedMovies}
          isSavedPage={false}
          handleCardLike={handleCardLike}
        />
      );
    }
  }, []);

  if (isLoading) {
    content = <Preloader isLoading={true} />;
  } else if (moviesErr) {
    content = (
      <p className="movies-card-list__text">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </p>
    );
  } else {
    content = (
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
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
          handleSubmitForm={handleSubmitForm}
          handleCheckboxStatus={handleCheckboxStatus}
        />
        {content}
      </main>
      <Footer />
    </>
  );
}
