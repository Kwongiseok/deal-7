import { LEFT_ICON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatListPageHeader({ $target }) {
  this.$header = createDOMwithSelector('div', '.chatListHeader');
  this.$header.addEventListener('click', (e) => {
    const link = e.target.dataset?.link;
    if (link === 'back') {
      history.back();
    }
  });

  $target.appendChild(this.$header);

  this.render = () => {
    this.$header.innerHTML = `
    <button class="chatListPageHeader__back__container">
      <img class="chatListPageHeader__icon" src="${LEFT_ICON}"/>
    </button>
    <span class="chatListPageHeader__title">채팅하기</span>
    <div>
      <img class="chatListPageHeader__icon invisible" src="${LEFT_ICON}"/>
    </div>
    `;
  };

  this.render();
}
