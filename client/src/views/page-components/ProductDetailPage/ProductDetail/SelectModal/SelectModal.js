import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function SelectModal({ $target, onClickDeleteHandler, onClickEditHandler }) {
  this.$selectModal = createDOMwithSelector('ul', '.selectModal');

  this.onDeleteHandler = onClickDeleteHandler;
  this.onEditHandler = onClickEditHandler;

  this.$selectModal.addEventListener('click', (e) => {
    const state = e.target.closest('li')?.dataset.link;
    if (state === 'edit') {
      this.onEditHandler();
    } else if (state === 'delete') {
      this.onDeleteHandler();
    }
  });

  $target.appendChild(this.$selectModal);

  this.render = () => {
    this.$selectModal.innerHTML = `<li class="selectModal__edit" data-link="edit">수정하기</li>
    <li class="selectModal__delete" data-link="delete">삭제하기</li>`;
  };

  this.render();

  this.hideModal = () => {
    this.$selectModal.classList.remove('opened');
  };

  this.showModal = () => {
    this.$selectModal.classList.add('opened');
  };
}
