import React from "react";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({
  handleSubmitForm,
  movies,
  savedMovies,
  filteredMovies,
  isLoading,
  moviesErr,
  handleCardLike,
  handleCheckboxStatus,
}) {
  let content;

  if (isLoading) {
    content = <Preloader isLoading={true} />;
  } else if (moviesErr) {
    content = (
      <p className="movies-card-list__text">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </p>
    );
  } else if (filteredMovies?.length === 0) {
    content = <p className="movies-card-list__text">Ничего не найдено</p>;
  } else if (filteredMovies?.length > 0) {
    content = (
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        filteredMovies={filteredMovies}
        isSavedPage={false}
        handleCardLike={handleCardLike}
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
          movies={"movies"}
          handleSubmitForm={handleSubmitForm}
          handleCheckboxStatus={handleCheckboxStatus}
        />
        {content}
      </main>
      <Footer />
    </>
  );
}
