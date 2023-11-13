// export const BASE_URL = "https://api.ekaterinamovies.nomoredomainsrocks.ru";
// export const BASE_URL = "http://localhost:3000";
import {BASE_URL} from "./constants";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(getResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
  }).then(getResponse);
};

export const setUserInfo = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(getResponse);
}

export const createCard = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then(getResponse);
}

export const getCards = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
  }).then(getResponse);
}

export const deleteCard = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
  }).then(getResponse);
}

export const getAppInfo = () => {
  return Promise.all([getCards(), getUserInfo()]);
}