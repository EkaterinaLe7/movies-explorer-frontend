// export const BASE_URL = "https://api.ekaterinamovies.nomoredomainsrocks.ru";
export const BASE_URL = "http://localhost:3000";

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

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};

// export const getUserInfo = () => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem('jwt')}`,
//       "Content-Type": "application/json",
//     },
//   }).then(getResponse);
// }

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