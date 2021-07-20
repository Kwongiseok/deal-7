import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import formatDate from '../../../utils/formatDate.js';

export default function ChatRoomList({ $target, initialState }) {
  this.state = initialState;
  this.$chatRoomList = createDOMwithSelector('ul', '.chatRoomList');

  this.$chatRoomList.addEventListener('click', (e) => {
    const url = e.target.closest('li')?.dataset.url;
    if (url) {
      location.href = url;
    }
  });

  $target.appendChild(this.$chatRoomList);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$chatRoomList.innerHTML = this.state
      .map(
        (item) => `
    <li class="chatRoomList__chatRoom" data-url=${item.url}>
      <div class="chatroom__chat__container">  
        <div class="chatRoom__info">
          <span class="chatRoom__name">${item.name || '임시네임'}</span>
          <span class="chatRoom__lastTime">${formatDate(item.lastchattime)}</span>
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
