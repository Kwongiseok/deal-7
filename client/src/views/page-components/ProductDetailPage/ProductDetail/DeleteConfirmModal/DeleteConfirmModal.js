import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function DeleteConfirmModal({ $target, onDeleteHandler }) {
  this.onDeleteHandler = onDeleteHandler;
  this.$deleteConfirmModal = createDOMwithSelector('div', '.deleteConfirmModal');

  this.$deleteConfirmModal.addEventListener('click', (e) => {
    const link = e.target.dataset?.link;
    if (!e.target.closest('.deleteConfirmModal__wrapper')) {
      this.hideModal();
    }

    if (link) {
      if (link === 'close') {
        this.hideModal();
      } else if (link === 'delete') {
        this.onDeleteHandler();
        this.hideModal();
      }
    }
  });

  $target.appendChild(this.$deleteConfirmModal);
  this.render = () => {
    this.$deleteConfirmModal.innerHTML = `
      <div class="deleteConfirmModal__wrapper">
        <div class="deleteConfirmModal__content">
          <span class="deleteConfirmModal__span">정말 지우시겠습니까?</span>
          <div class="deleteConfirmModal__button__container">
            <button class="deleteConfirmModal__close" data-link="close">
              취소
            </button>
            <button class="deleteConfirmModal__delete" data-link="delete">
              지우기
            </button>
          </div>
        </div>
      </div>
      `;
  };

  this.hideModal = () => {
    this.$deleteConfirmModal.classList.remove('opened');
  };

  this.showModal = () => {
    this.$deleteConfirmModal.classList.add('opened');
  };

  this.render();
}
