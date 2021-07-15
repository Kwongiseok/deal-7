import { PRODUCT_CHANGE_STATE, PRODUCT_STATE } from '../../../../../constants/productState.js';
import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function SelectStateModal({ $target, onChangeStateHandler, initialState }) {
  /**
   * this.state = {
   *  state : string
   * }
   */
  this.state = initialState;
  this.$selectModal = createDOMwithSelector('ul', '.selectStateModal');

  this.onChangeStateHandler = onChangeStateHandler;

  this.$selectModal.addEventListener('click', (e) => {
    const state = e.target.closest('li')?.dataset.state;
    if (state) {
      this.onChangeStateHandler(state);
      this.hideModal();
    }
  });
  $target.appendChild(this.$selectModal);

  this.setState = (nextState) => {
    this.currentState = nextState;
    this.render();
  };
  this.render = () => {
    this.$selectModal.innerHTML = this.filterToHtml();
  };

  this.filterToHtml = () => {
    const stateList = [...PRODUCT_STATE];
    const stateNameList = [...PRODUCT_CHANGE_STATE];
    const filteredHtml = stateNameList
      .map((state, index) => {
        if (stateList[index] === this.state.state) return '';
        return `<li class="selectStateModal__state" data-state=${stateList[index]}>${state}</li>`;
      })
      .join('');
    return filteredHtml;
  };

  this.hideModal = () => {
    this.$selectModal.classList.remove('opened');
  };

  this.showModal = () => {
    this.$selectModal.classList.add('opened');
  };

  this.render();
}
