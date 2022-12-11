import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

export default function MoviesCardList({
  movies,
  savedMovies,
  isSavedPage,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [moreMoviesCount, setMoreMoviesCount] = useState(0);
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesArr, setMoviesArr] = useState([]);
  let moreButton;
  // слушатель на изменение ширины экрана
  useEffect(() => {
    handlePageWidth();
    window.addEventListener("resize", handlePageWidth);
    return () => window.removeEventListener("resize", handlePageWidth);
  }, []);

  // рассчёт количества загружаемых карточек с фильмами
  let handlePageWidth = () => {
    let resizePageWidth = document.documentElement.scrollWidth;
    if (resizePageWidth >= 1280) {
      setMoreMoviesCount(4);
      return setMoviesCount(12);
    } else if (resizePageWidth >= 990) {
      setMoreMoviesCount(3);
      return setMoviesCount(9);
    } else if (resizePageWidth >= 768) {
      setMoreMoviesCount(2);
      return setMoviesCount(8);
    } else {
      setMoreMoviesCount(2);
      return setMoviesCount(5);
    }
  };

  // сбор фильмов при загрузке
  useEffect(() => {
    if (movies) {
      setMoviesArr(movies.slice(0, moviesCount));
    } 
  }, [moviesCount, movies]);

  if (movies?.length <= moviesCount) {
    moreButton = <></>;
  } else {
    moreButton = (
      <Preloader
        isLoading={false}
        handleUploadMovies={() => setMoviesCount(moviesCount + moreMoviesCount)}
      />
    );
  }

  const IsLikedCheck = (movie) => {
    let savedMovie = savedMovies?.filter((item) => {
      return item.movieId === movie.id && item.owner === currentUser.id;
    });
    return savedMovie[0]?._id;
  };

  return (
    <>
      <section className="movies-card-list">
        <div className="movies-card-list__section">
          {moviesArr?.map((item) => (
            <MoviesCard
              movie={item}
              isLiked={IsLikedCheck(item)}
              key={item.id ? item.id : item._id}
              saved={isSavedPage}
              handleCardLike={handleCardLike}
            />
          ))}
        </div>
      </section>
      {moreButton}
    </>
  );
}
