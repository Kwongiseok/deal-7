import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatRoomList({ $target }) {
  // TODO 권기석 : 더미데이터, API 연동 후 수정할 예정입니다.
  this.state = {
    username: 'UserE',
    lastChat: '실제로 신어볼 수 있는건가요??ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㄴㅁㄴㅇㅁㄴㅇㅇㄴㅁㅇ',
    unreadChats: 2,
    time: '1분 전',
    thumbnail: 'https://i.pinimg.com/564x/d7/ec/75/d7ec75c9e68873ee75b734ac4ab09ced.jpg',
  };

  this.$chatRoomList = createDOMwithSelector('ul', '.chatRoomList');

  this.$chatRoomList.addEventListener('click', (e) => {
    const link = e.target.closest('li')?.dataset.link;
    if (link) {
      console.log(`id= ${link}로 이동!`);
    }
  });

  $target.appendChild(this.$chatRoomList);

  this.render = () => {
    this.$chatRoomList.innerHTML = [0, 1, 2, 3]
      .map(
        (item) => `
    <li class="chatRoomList__chatRoom">
      <div class="chatroom__chat__container">  
        <div class="chatRoom__info">
          <span class="chatRoom__name">${this.state.username}</span>
          <span class="chatRoom__lastTime">${this.state.time}</span>
        </div>
        <div class="chatRoom__chat__container">
          <span class="chatRoom__chat">${this.state.lastChat}</span>
            ${getUnreadChats()}
        </div>
      </div>
      <div class="chatRoom__thumbnail__container">
        <img class="chatRoom__thumbnail" src="${this.state.thumbnail}"/>
      </div>
    </li>`
      )
      .join('');
  };

  const getUnreadChats = () => {
    if (this.state.unreadChats) {
      return `<div class="chatRoom__unreadChats">
        <span class="chatRoom__unreadChats__count">${this.state.unreadChats}</span>
      </div>`;
    }
  };

  this.render();
}
