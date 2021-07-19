import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatRoomList({ $target, initialState }) {
  // TODO 권기석 : 더미데이터, API 연동 후 수정할 예정입니다.
  this.state = initialState;
  this.$chatRoomList = createDOMwithSelector('ul', '.chatRoomList');

  this.$chatRoomList.addEventListener('click', (e) => {
    const link = e.target.closest('li')?.dataset.link;
    if (link) {
      console.log(`id= ${link}로 이동!`);
    }
  });

  $target.appendChild(this.$chatRoomList);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    this.$chatRoomList.innerHTML = this.state
      .map(
        (item) => `
    <li class="chatRoomList__chatRoom">
      <div class="chatroom__chat__container">  
        <div class="chatRoom__info">
          <span class="chatRoom__name">${item.username || '임시네임'}</span>
          <span class="chatRoom__lastTime">${item.lastchattime}</span>
        </div>
        <div class="chatRoom__chat__container">
          <span class="chatRoom__chat">${item.lastchat}</span>
            ${getUnreadChats(item)}
        </div>
      </div>
      <div class="chatRoom__thumbnail__container">
        <img class="chatRoom__thumbnail" src="${item.thumbnail}"/>
      </div>
    </li>`
      )
      .join('');
  };

  const getUnreadChats = (item) => {
    if (item.unreadChats) {
      return `<div class="chatRoom__unreadChats">
        <span class="chatRoom__unreadChats__count">${item.unreadChats}</span>
      </div>`;
    }
    return '';
  };

  this.render();
}
