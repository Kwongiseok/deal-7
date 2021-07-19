const BASE_URL = 'http://localhost:8080';

const AuthAPI = {};

AuthAPI.requestLogin = (data) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

AuthAPI.requestSignup = (data) => {
  return fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

AuthAPI.getAccessToken = (token) => {
  return fetch(`${BASE_URL}/auth/refresh`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export default AuthAPI;
