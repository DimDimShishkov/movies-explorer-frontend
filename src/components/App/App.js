import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { ShortFilmLong } from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [isUserChanged, setIsUserChanged] = useState(false);
  const [moviesErr, setMoviesErr] = useState(false);
  const [movieItems, setMovieItems] = useState([]);
  const [longMovieItems, setLongMovieItems] = useState([]);
  const [shortMovieItems, setShortMovieItems] = useState([]);
  const [longSavedMovieItems, setLongSavedMovieItems] = useState([]);
  const [shortSavedMovieItems, setShortSavedMovieItems] = useState([]);
  const [savedMovieItems, setSavedMovieItems] = useState([]);
  const [moviesIsNotFound, setMoviesIsNotFound] = useState(false);
  const [savedMoviesIsNotFound, setSavedMoviesIsNotFound] = useState(false);
  const history = useNavigate();
  let location = useLocation();
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
      .then(() => {
        setLoggedIn(true);
        authorization("/movies");
        handleUploadSavedMovies();
      })
      .catch((err) => setErrorType(err))
      .finally(() => setIsLoading(false));
  }
  // загрузка данных профиля с сервера
  const authorization = async (path) => {
    authTokenCheck()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({
            id: res._id,
            email: res.email,
            name: res.name,
          });
          if (
            location.pathname === "/signup" ||
            location.pathname === "/signin"
          )
            history("/");
          else history(path || location.pathname);
        }
      })
      .catch(() => handleLoggedOut(true));
  };
  // загрузка сохраненных фильмов с сервера
  function handleUploadSavedMovies() {
    setIsLoading(true);
    handleDownloadMovies()
      .then((res) => {
        setSavedMovieItems(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
      })
      .catch((err) => setMoviesErr(err))
      .finally(() => setIsLoading(false));
  }

  // хук заполнения данных профиля и фильмов после авторизации
  useEffect(() => {
    authorization();
    setMoviesErr(false);
    setSavedMoviesIsNotFound(false);
    let savedMovies = localStorage.getItem("savedMovies");
    if (!savedMovies) {
      handleUploadSavedMovies();
    } else {
      setSavedMovieItems(JSON.parse(savedMovies));
    }
    let moviesFound = JSON.parse(localStorage.getItem("moviesFound"));
    let moviesCheckbox = JSON.parse(localStorage.getItem("moviesCheckbox"));
    moviesFound && handleFilterShortMovies(false, moviesFound, moviesCheckbox);
  }, [loggedIn]);

  // функция выхода из аккаунта
  function handleLoggedOut(isPush = false) {
    setIsLoading(false);
    authCheckOut();
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("moviesCheckbox");
    localStorage.removeItem("moviesSearch");
    localStorage.removeItem("moviesFound");
    setCurrentUser({});
    setLoggedIn(false);
    isPush ? console.log("Требуется повторная авторизация") : history("/");
  }

  // функция редактирования аккаунта
  function handleUpdateProfileInfo(user) {
    setIsLoading(true);
    setIsUserChanged(false);
    handleEditUserInfo(user)
      .then((res) => {
        setIsUserChanged(true);
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
      return (
        movie.director.toLowerCase().includes(criterion.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(criterion.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(criterion.toLowerCase()) ||
        movie.country.toLowerCase().includes(criterion.toLowerCase())
      );
    });
    // разделение на длинные и короткие фильмы
    handleFilterShortMovies(type, arr, isShort);
    !type && localStorage.setItem(`${MoviesArr}Found`, JSON.stringify(arr));
  }

  // разделение на длинные и короткие фильмы
  function handleFilterShortMovies(type, arr, isShort) {
    let shortFilms = [];
    let longFilms = [];
    if (type) {
      setLongSavedMovieItems([]);
      setShortSavedMovieItems([]);
      arr?.forEach((movie) => {
        movie.duration <= ShortFilmLong
          ? shortFilms.push(movie)
          : longFilms.push(movie);
      });
      setLongSavedMovieItems(longFilms);
      setShortSavedMovieItems(shortFilms);
      if (isShort) {
        shortFilms?.length === 0
          ? setSavedMoviesIsNotFound(true)
          : setSavedMoviesIsNotFound(false);
        setSavedMovieItems(shortFilms);
      } else {
        longFilms?.length === 0
          ? setSavedMoviesIsNotFound(true)
          : setSavedMoviesIsNotFound(false);
        setSavedMovieItems(longFilms);
      }
    } else {
      setLongMovieItems([]);
      setShortMovieItems([]);
      arr?.forEach((movie) => {
        movie.duration <= ShortFilmLong
          ? shortFilms.push(movie)
          : longFilms.push(movie);
      });
      setLongMovieItems(longFilms);
      setShortMovieItems(shortFilms);
      if (isShort) {
        shortFilms?.length === 0
          ? setMoviesIsNotFound(true)
          : setMoviesIsNotFound(false);
        setMovieItems(shortFilms);
      } else {
        longFilms?.length === 0
          ? setMoviesIsNotFound(true)
          : setMoviesIsNotFound(false);
        setMovieItems(longFilms);
      }
    }
  }

  // смена чекбокса "короткометражки"
  function handleCheckboxStatus(isShort, type) {
    if (isShort) {
      if (type) {
        shortSavedMovieItems?.length === 0
          ? setSavedMoviesIsNotFound(true)
          : setSavedMoviesIsNotFound(false);
        setSavedMovieItems(shortSavedMovieItems);
      } else {
        shortMovieItems?.length === 0
          ? setMoviesIsNotFound(true)
          : setMoviesIsNotFound(false);
        setMovieItems(shortMovieItems);
      }
    } else {
      if (type) {
        longSavedMovieItems?.length === 0
          ? setSavedMoviesIsNotFound(true)
          : setSavedMoviesIsNotFound(false);
        setSavedMovieItems(longSavedMovieItems);
      } else {
        longMovieItems?.length === 0
          ? setMoviesIsNotFound(true)
          : setMoviesIsNotFound(false);
        setMovieItems(longMovieItems);
      }
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
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      handleFilterMovies(MoviesArr, savedMovies, criterion, isShort, true);
    }
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
                <ProtectedRoute
                  loggedIn={!loggedIn}
                  component={Register}
                  handleSubmitForm={handleRegister}
                  isLoading={isLoading}
                  errorType={errorType}
                />
              }
            />
            <Route
              path="signin"
              element={
                <ProtectedRoute
                  loggedIn={!loggedIn}
                  component={Login}
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
                  component={Movies}
                  handleSubmitForm={handleMovieSearch}
                  movies={movieItems}
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
                  component={SavedMovies}
                  handleSubmitForm={handleMovieSearch}
                  movies={savedMovieItems}
                  savedMoviesIsNotFound={savedMoviesIsNotFound}
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
                  component={Profile}
                  handleSubmitForm={handleUpdateProfileInfo}
                  isLoading={isLoading}
                  handleLoggedOut={handleLoggedOut}
                  errorType={errorType}
                  isUserChanged={isUserChanged}
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
