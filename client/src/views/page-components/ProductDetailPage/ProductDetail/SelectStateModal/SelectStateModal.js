import { PRODUCT_CHANGE_STATE, PRODUCT_STATE } from '../../../../constants/productState.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function SelectStateModal({ $target, onDeleteHandler, onEditHandler, currentState }) {
  this.currentState = currentState;
  this.$selectModal = createDOMwithSelector('ul', '.selectStateModal');

  this.onEditHandler = onEditHandler;
  this.onDeleteHandler = onDeleteHandler;

  this.$selectModal.addEventListener('click', (e) => {
    const state = e.target.closest('li')?.dataset.state;
    // if (state === "")
  });
  $target.appendChild(this.$selectModal);

  this.setState = (nextState) => {
    this.currentState = nextState;
    this.render();
  };
  this.render = () => {
    this.$selectModal.innerHTML = this.filterToHtml;
  };

  this.filterToHtml = () => {
    const stateList = [...PRODUCT_STATE];
    const stateNameList = [...PRODUCT_CHANGE_STATE];
    const filteredHtml = stateNameList
      .map((state, index) => {
        if (stateList[index] === currentState) return '';
        return `<li class="selectStateModal__state" data-state=${stateList[index]}>${state}</li>`;
      })
      .join('');
    return filteredHtml;
  };

  this.render();
}
