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

export default AuthAPI;
