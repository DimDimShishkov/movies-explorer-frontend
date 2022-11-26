import React, { useEffect, useState } from "react";
import { MoviesApi } from "../../utils/MoviesApi";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  const [movieItems, setMovieItems] = useState([]);

  const [lastI, setLastI] = useState(0);
  let arr = movieItems;

  // костыль для проверки верстки
  function biba() {
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
      });
  }

  useEffect(() => {
    biba();
  }, []);

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm />
        <MoviesCardList movies={movieItems} saved={false} />
      </main>
      <Footer />
    </>
  );
}
