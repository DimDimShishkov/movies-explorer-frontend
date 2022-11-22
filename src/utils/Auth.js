// const BASE_URL = "https://api.movies-explorer-ddsh.nomoredomains.icu";
const BASE_URL = "http://localhost";

const handleReturn = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const authRegister = (user) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    }),
  }).then((res) => handleReturn(res));
}

export const authCheckIn = (user) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    }),
  }).then((res) => handleReturn(res));
}

export const authTokenCheck = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization" : `${jwt}`,
    },
  }).then((res) => handleReturn(res));
}