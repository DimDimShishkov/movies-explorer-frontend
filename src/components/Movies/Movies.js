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
  moviesIsNotFound,
  isLoading,
  moviesErr,
  handleCardLike,
  handleCheckboxStatus,
}) {
  // const [movieItems, setMovieItems] = useState([])

  /*   const addTodo = useCallback(() => {
    setMovieItems(movieItems);
  }, [movies]); */

  let content;
  let moviesFound = JSON.parse(localStorage.getItem("moviesFound"));

  useEffect(() => {
    if (!moviesFound) {
      content = <></>;
    }  
  }, []);

  if (moviesFound) {
    content = (
      <MoviesCardList
        movies={moviesFound}
        savedMovies={savedMovies}
        isSavedPage={false}
        handleCardLike={handleCardLike}
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
