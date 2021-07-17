import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatRoomAlertModal({ $target, onOutHandler }) {
  this.onOutHandler = onOutHandler;
  this.$modal = createDOMwithSelector('div', '.chatRoomAlertModal');
  this.$modal.addEventListener('click', (e) => {
    const link = e.target.dataset?.link;
    if (!e.target.closest('.chatRoomAlertModal__wrapper')) {
      this.hideModal();
    }
    if (!link) return;

    if (link === 'close') {
      this.hideModal();
    } else if (link === 'out') {
      this.onOutHandler();
      this.hideModal();
    }
  });

  $target.appendChild(this.$modal);

  this.render = () => {
    this.$modal.innerHTML = `
      <div class="chatRoomAlertModal__wrapper">
        <div class="chatRoomAlertModal__content">
          <span class="chatRoomAlertModal__span">정말 나가시겠습니까?</span>
          <div class="chatRoomAlertModal__button__container">
            <button class="chatRoomAlertModal__close" data-link="close">
              취소
            </button>
            <button class="chatRoomAlertModal__delete" data-link="out">
            나가기
            </button>
          </div>
        </div>
      </div>
      `;
  };

  this.hideModal = () => {
    this.$modal.classList.remove('opened');
  };

  this.showModal = () => {
    this.$modal.classList.add('opened');
  };

  this.render();
}
