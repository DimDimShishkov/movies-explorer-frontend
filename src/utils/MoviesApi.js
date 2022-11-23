class Api {
  constructor(configApi) {
    this._url = configApi.url;
    this._headers = configApi.headers;
  }

  // обработчик ответа сервера
  _handleReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  handleDownloadProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleReturn(res));
  }

  // Редактирование профиля
  handleUploadProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._handleReturn(res));
  }

  // Загрузка фильмов с сервера
  handleDownloadMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleReturn(res));
  }

  // Добавление фильма на сервер
  handleUploadMovie(item) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: item.country,
        director: item.director,
        duration: item.duration,
        description: item.description,
        image: item.image,
        trailerLink: item.trailerLink,
        thumbnail: item.thumbnail,
        movieId: item.movieId,
        nameRU: item.nameRU,
        nameEN: item.nameEN,      
      }),
    }).then((res) => this._handleReturn(res));
  }

  // Удаление фильма
  handleDeleteMovie(cardId) {
    return fetch(`${this._url}/movies/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleReturn(res));
  }
}

export const MoviesApi = new Api({
  // url: "https://api.movies-explorer-ddsh.nomoredomains.icu",
  url: "https://localhost",
  headers: {
    "Content-Type": "application/json",
  },
});
