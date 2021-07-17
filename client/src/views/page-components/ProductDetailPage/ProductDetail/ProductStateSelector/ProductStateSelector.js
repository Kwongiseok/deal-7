import { DOWN_ICON } from '../../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function ProductStateSelector({ $target, onClickSelectorHandler, initialState }) {
  /**
   * this.state = {
   *  isSeller : boolean,
   *  state : string,
   * }
   */
  this.state = initialState;
  this.onClickSelectorHandler = onClickSelectorHandler;

  this.$productStateSelector = createDOMwithSelector('button', '.productStateSelector');
  this.$productStateSelector.addEventListener('click', this.onClickSelectorHandler);

  $target.appendChild(this.$productStateSelector);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.isSeller) {
      this.$productStateSelector.innerHTML = `
        <span class="productStateSelector__state">${this.state.state}</span>
        <img class="productStateSelector__icon" src=${DOWN_ICON}></img>
      `;
    } else {
      this.$productStateSelector.style.display = 'none';
    }
  };

  this.render();
}
