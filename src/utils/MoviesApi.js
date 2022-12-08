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
  // Удаление фильма
  handleUploadMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleReturn(res));
  }
}

export const MoviesApi = new Api({
  // url: "https://api.movies-explorer-ddsh.nomoredomains.icu",
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});
