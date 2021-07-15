import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ProductModifyModal({ $selector, idx }) {
  this.$ProductModifymodal = createDOMwithSelector('aside', '.product-modify-modal');
  this.$ProductModifymodal.setAttribute('data-modal-number', idx);
  $selector.appendChild(this.$ProductModifymodal);

  const bindEvents = () => {
    this.$ProductModifymodal.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.closest("[data-attribute='modify']")) {
        //TODO: Add Modify Event
      }
      if (e.target.closest("[data-attribute='delete']")) {
        //TODO: Add Delete Event
      }
    });
  };

  this.render = () => {
    this.$ProductModifymodal.innerHTML = `
      <div class='product-modify-modal__item modify' data-attribute="modify">
          <span>수정하기</span>
      </div>
      <div class='product-modify-modal__item delete' data-attribute="delete">
          <span>삭제하기</span>
      </div>
    `;
  };

  this.render();
  bindEvents();
}
