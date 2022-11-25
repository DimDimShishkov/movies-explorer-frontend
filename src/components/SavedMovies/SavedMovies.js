import React, { useState } from "react";
import { MoviesApi } from "../../utils/MoviesApi";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  const [movieItems, setMovieItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [lastI, setLastI] = useState(0);
  let arr = movieItems;

  // костыль для проверки верстки
  function biba() {
    setIsLoading(true);
    return MoviesApi.handleUploadMovies()
      .then((res) => {
        let i = lastI;
        while (i < lastI + 3) {
          arr.push(res[i]);
          i++;
          setLastI(i);
        }
        setMovieItems(arr);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <section className="main">
        <SearchForm />
        <MoviesCardList movies={movieItems} saved={false} />
        <Preloader isLoading={isLoading} handleUploadMovies={biba} />
      </section>
      <Footer />
    </>
  );
}
