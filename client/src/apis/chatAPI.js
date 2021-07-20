// const base_url = 'http://localhost:8080';
const base_url = 'http://localhost:8080/chat/api/1/2/3';
export function getChats(url, token) {
  return fetch(`${base_url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        // TODO: 권한이 없을 때 main url로 이동
        location.href = 'https://www.naver.com';
      }
    })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
    });
}

export function getChatRoomsAboutProduct(url, token) {
  return fetch(`http://localhost:8080/chat/api/1`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.error(err));
}

export function getMyAllChatRooms(token) {
  return fetch(`http://localhost:8080/chat/api/All`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else {
        // TODO: 권한이 없을 때 main url 이동
      }
    })
    .then((res) => res)
    .catch((error) => console.log(error));
}

export function outChatRooms(roomId, token) {
  return fetch(`http://localhost:8080/chat/api/out/12`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
}
