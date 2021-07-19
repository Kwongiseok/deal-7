// const base_url = 'http://localhost:8080';
const base_url = 'http://localhost:8080/chat/1234/1244/144';
export function getChats(url) {
  return fetch(`${base_url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      alert(err);
    });
}

export function getChatRoomsAboutProduct(url) {
  return fetch(`http://localhost:8080/chat/1234`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res);
}
