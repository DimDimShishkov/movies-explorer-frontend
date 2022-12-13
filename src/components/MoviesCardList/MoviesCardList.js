import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  DesktopInitialCards,
  DesktopMoreCards,
  DesktopWight,
  MobileInitialCards,
  MobileMoreCards,
  MobileWight,
  SmallInitialCards,
  TabletInitialCards,
  TabletMoreCards,
  TabletWight,
} from "../../utils/constants";
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
    if (resizePageWidth >= DesktopWight) {
      setMoreMoviesCount(DesktopMoreCards);
      return setMoviesCount(DesktopInitialCards);
    } else if (resizePageWidth >= TabletWight) {
      setMoreMoviesCount(TabletMoreCards);
      return setMoviesCount(TabletInitialCards);
    } else if (resizePageWidth >= MobileWight) {
      setMoreMoviesCount(MobileMoreCards);
      return setMoviesCount(MobileInitialCards);
    } else {
      setMoreMoviesCount(MobileMoreCards);
      return setMoviesCount(SmallInitialCards);
    }
  };

  // сбор фильмов при загрузке
  useEffect(() => {
    if (movies) {
      setMoviesArr(movies.slice(0, moviesCount));
    }
  }, [moviesCount, movies]);

  if (movies && movies?.length <= moviesCount) {
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
    return savedMovie && savedMovie[0]?._id;
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
