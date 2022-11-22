import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies() {
  return (
    <>
      <Header isLoggedIn={true} />
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </>
  );
}
