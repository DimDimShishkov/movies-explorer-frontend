const BASE_URL = "https://api.movies-explorer-ddsh.nomoredomains.icu";
// const BASE_URL = "http://localhost";

const handleReturn = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};
// регистрация через post /signup
export const authRegister = (user) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    }),
  }).then((res) => handleReturn(res));
};
// авторизация через post /signin
export const authCheckIn = (user) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then((res) => handleReturn(res));
};
// получение токена и данных профиля через get /users/me
export const authTokenCheck = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
    },
  }).then((res) => handleReturn(res));
};

// выход из аккаунта post /signout
export const authCheckOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

// обновляет информацию о пользователе через patch /users/me
export const handleEditUserInfo = (user) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
    }),
  }).then((res) => handleReturn(res));
};

// Загрузка отмеченных фильмов с сервера
export const handleDownloadMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => handleReturn(res));
};

// Добавление фильма на сервер
export const handleLikeMovie = (item) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: `https://api.nomoreparties.co${item.image.url}`,
      trailerLink: item.trailerLink,
      thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
      movieId: item.id,
      nameRU: item.nameRU,
      nameEN: item.nameEN,
    }),
  }).then((res) => handleReturn(res));
};

// Удаление фильма
export const handleDislikeMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => handleReturn(res));
};
