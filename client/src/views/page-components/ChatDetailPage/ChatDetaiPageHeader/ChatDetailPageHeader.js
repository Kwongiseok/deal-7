import { LEFT_ICON, LOGOUT_ICON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatDetailPageHeader({ $target, onOutChatRoom }) {
  this.$header = createDOMwithSelector('div', '.chatDetailPageHeader');
  this.onOutChatRoom = onOutChatRoom;
  this.$header.addEventListener('click', (e) => {
    const link = e.target.closest('button')?.dataset.link;
    if (!link) return;
    if (link === 'back') {
      history.back();
    } else if (link === 'out') {
      this.onOutChatRoom();
    }
  });
  $target.appendChild(this.$header);

  this.render = () => {
    this.$header.innerHTML = `
      <button class="chatDetailPageHeader__back__container" data-link="back">
        <img class="chatDetailPageHeader__icon" src="${LEFT_ICON}"/>
      </button>
      <span class="chatDetailPageHeader__title">${'유저이름'}</span>
      <button class="chatDetailPageHeader__out__container" data-link="out">
        <img class="chatDetailPageHeader__icon" src="${LOGOUT_ICON}"/>
      </button>
    `;
  };

  this.render();
}
