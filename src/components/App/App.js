import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NoPage from "../NoPage/NoPage";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import {
  authRegister,
  authTokenCheck,
  authCheckIn,
  authCheckOut,
  handleEditUserInfo,
  handleDownloadMovies,
  handleLikeMovie,
  handleDislikeMovie,
} from "../../utils/MainApi";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { MoviesApi } from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [moviesErr, setMoviesErr] = useState(false);
  const [movieItems, setMovieItems] = useState([]);
  const [longMovieItems, setLongMovieItems] = useState([]);
  const [shortMovieItems, setShortMovieItems] = useState([]);
  const [longSavedMovieItems, setLongSavedMovieItems] = useState([]);
  const [shortSavedMovieItems, setShortSavedMovieItems] = useState([]);
  const [savedMovieItems, setSavedMovieItems] = useState([]);
  const [moviesIsNotFound, setMoviesIsnotFound] = useState(false);
  const [savedMoviesIsNotFound, setSavedMoviesIsnotFound] = useState(false);
  const history = useNavigate();

  // функция регистрации
  function handleRegister(user) {
    setIsLoading(true);
    authRegister(user)
      .then(() => handleAuth(user))
      .catch((err) => setErrorType(err))
      .finally(() => setIsLoading(false));
  }
  // функция авторизации
  function handleAuth(user) {
    setIsLoading(true);
    authCheckIn(user)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        history("/movies");
      })
      .catch((err) => setErrorType(err))
      .finally(() => setIsLoading(false));
  }

  // загрузка данных профиля с сервера
  const authorization = async (jwt) => {
    authTokenCheck(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({
            id: res._id,
            email: res.email,
            name: res.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // загрузка сохраненных фильмов с сервера
  function handleUploadSavedMovies() {
    setIsLoading(true);
    handleDownloadMovies()
      .then((res) => localStorage.setItem("savedMovies", JSON.stringify(res)))
      .catch((err) => setMoviesErr(err))
      .finally(() => setIsLoading(false));
  }
  /*   // загрузка фильмов с сервера
  function handleUploadMovies() {
    setIsLoading(true);
    MoviesApi.handleUploadMovies()
      .then((res) => localStorage.setItem("movies", JSON.stringify(res)))
      .catch((err) => setMoviesErr(err))
      .finally(() => setIsLoading(false));
  } */

  // хук заполнения данных профиля и фильмов после авторизации
  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      authorization(jwt);
      let savedMovies = localStorage.getItem("savedMovies");
      if (!savedMovies) {
        handleUploadSavedMovies();
      }
      setSavedMovieItems(JSON.parse(savedMovies));
    }

    /*     let movies = localStorage.getItem("movies");
    if (!movies) {
      handleUploadMovies();
    }
    setMovieItems(JSON.parse(movies)); */
  }, []);

  // функция выхода из аккаунта
  function handleLoggedOut() {
    setIsLoading(false);
    authCheckOut();
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("moviesCheckbox");
    localStorage.removeItem("savedMoviesCheckbox");
    localStorage.removeItem("moviesSearch");
    localStorage.removeItem("savedMoviesSearch");
    localStorage.removeItem("moviesFound");
    localStorage.removeItem("savedMoviesFound");
    setCurrentUser({});
    setLoggedIn(false);
    history("/");
  }

  // функция редактирования аккаунта
  function handleUpdateProfileInfo(user) {
    setIsLoading(true);
    handleEditUserInfo(user)
      .then((res) => {
        setCurrentUser({
          id: res._id,
          email: res.email,
          name: res.name,
        });
      })
      .catch((err) => setErrorType(err))
      .finally(() => setIsLoading(false));
  }

  // функция фильтрации фильмов
  function handleFilterMovies(
    MoviesArr,
    movies,
    criterion,
    isShort,
    type = false
  ) {
    let arr = movies.filter((movie) => {
      if (movie.director.toLowerCase().includes(criterion.toLowerCase())) {
        return movie;
      } else if (movie.nameRU.toLowerCase().includes(criterion.toLowerCase())) {
        return movie;
      } else if (movie.nameEN.toLowerCase().includes(criterion.toLowerCase())) {
        return movie;
      } else if (
        movie.country.toLowerCase().includes(criterion.toLowerCase())
      ) {
        return movie;
      } else {
        return false;
      }
    });
    // если не найдено
    if (arr.length === 0) {
      MoviesArr === "movies"
        ? setMoviesIsnotFound(true)
        : setSavedMoviesIsnotFound(true);
    } else {
      MoviesArr === "movies"
        ? setMoviesIsnotFound(false)
        : setSavedMoviesIsnotFound(false);
    }
    // разделение на длинные и короткие фильмы
    let shortFilms = [];
    let longFilms = [];
    if (type) {
      setLongSavedMovieItems([]);
      setShortSavedMovieItems([]);
      arr.forEach((movie) => {
        movie.duration <= 40 ? shortFilms.push(movie) : longFilms.push(movie);
      });
      setLongSavedMovieItems(longFilms);
      setShortSavedMovieItems(shortFilms);
      isShort ? setSavedMovieItems(shortFilms) : setSavedMovieItems(longFilms)
    } else {
      setLongMovieItems([]);
      setShortMovieItems([]);
      arr.forEach((movie) => {
        movie.duration <= 40 ? shortFilms.push(movie) : longFilms.push(movie);
      });
      setLongMovieItems(longFilms);
      setShortMovieItems(shortFilms);
      isShort ? setMovieItems(shortFilms) : setMovieItems(longFilms)
    }
    localStorage.setItem(`${MoviesArr}Found`, JSON.stringify(arr));
  }

  // смена чекбокса "короткометражки"
  function handleCheckboxStatus(isShort, type) {
    if (isShort) {
      type
        ? setSavedMovieItems(shortSavedMovieItems)
        : setMovieItems(shortMovieItems);
    } else {
      type
        ? setSavedMovieItems(longSavedMovieItems)
        : setMovieItems(longMovieItems);
    }
  }

  // поиск фильмов
  function handleMovieSearch(MoviesArr, criterion, isShort) {
    setMoviesErr(false);
    if (MoviesArr === "movies") {
      let movies = JSON.parse(localStorage.getItem("movies"));
      if (!movies) {
        setIsLoading(true);
        MoviesApi.handleUploadMovies()
          .then((res) => {
            localStorage.setItem("movies", JSON.stringify(res));
            handleFilterMovies(MoviesArr, res, criterion, isShort);
          })
          .catch((err) => setMoviesErr(err))
          .finally(() => setIsLoading(false));
      } else {
        handleFilterMovies(MoviesArr, movies, criterion, isShort);
      }
    } else {
      handleFilterMovies(MoviesArr, savedMovieItems, criterion, isShort, true);
    }
  }

  // поиск по своим фильмам
  function handleSavedMovieSearch(criterion, isShort) {
    setMoviesErr(false);
    //  let SavedMoviesArr = localStorage.getItem("savedMovies");
    handleFilterMovies(savedMovieItems, criterion, isShort, true);
  }

  // установка лайка на карточку с фильмом
  function handleCardLike(movie, isLiked) {
    if (!isLiked) {
      handleLikeMovie(movie)
        .then((res) => {
          let arr = [res, ...savedMovieItems];
          setSavedMovieItems(arr);
          localStorage.setItem("savedMovies", JSON.stringify(arr));
        })
        .catch((err) => console.log(err));
    } else {
      handleDislikeMovie(movie.id ? isLiked : movie._id)
        .then(() => {
          let arr = savedMovieItems.filter(
            (item) => item._id !== (movie._id ? movie._id : isLiked)
          );
          setSavedMovieItems(arr);
          localStorage.removeItem("savedMovies");
          localStorage.setItem("savedMovies", JSON.stringify(arr));
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/">
            <Route index element={<Main loggedIn={loggedIn} />} />
            <Route
              path="signup"
              element={
                <Register
                  handleSubmitForm={handleRegister}
                  isLoading={isLoading}
                  errorType={errorType}
                />
              }
            />
            <Route
              path="signin"
              element={
                <Login
                  handleSubmitForm={handleAuth}
                  isLoading={isLoading}
                  errorType={errorType}
                />
              }
            />
            <Route
              path="movies"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  path="movies"
                  component={Movies}
                  handleSubmitForm={handleMovieSearch}
                  movies={movieItems}
                  savedMovies={savedMovieItems}
                  moviesIsNotFound={moviesIsNotFound}
                  isLoading={isLoading}
                  moviesErr={moviesErr}
                  handleCardLike={handleCardLike}
                  handleCheckboxStatus={handleCheckboxStatus}
                />
              }
            />
            <Route
              path="saved-movies"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  path="saved-movies"
                  component={SavedMovies}
                  handleSubmitForm={handleMovieSearch}
                  movies={savedMovieItems}
                  moviesIsNotFound={savedMoviesIsNotFound}
                  isLoading={isLoading}
                  moviesErr={moviesErr}
                  handleCardDislike={handleCardLike}
                  handleCheckboxStatus={handleCheckboxStatus}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  path="profile"
                  component={Profile}
                  handleSubmitForm={handleUpdateProfileInfo}
                  isLoading={isLoading}
                  handleLoggedOut={handleLoggedOut}
                  errorType={errorType}
                />
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
