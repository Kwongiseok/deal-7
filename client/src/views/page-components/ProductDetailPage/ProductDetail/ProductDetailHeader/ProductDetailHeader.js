import { DROPDOWN_ICON, LEFT_ICON } from '../../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function ProductDetailHeader({ $target, initialState, onClickOptionHandler }) {
  /**
   * this.state = {
   *  isSeller : boolean
   * }
   */
  this.state = initialState;

  this.$productDetailHeader = createDOMwithSelector('div', '.productDetailHeader');
  $target.appendChild(this.$productDetailHeader);

  this.render = () => {
    this.$productDetailHeader.innerHTML = `
    <button class="productDetailHeader__back">
      <img class="productDetailHeader__icon" src=${LEFT_ICON} />
    </button>
    <button class="productDetailHeader__option">
      <img class="productDetailHeader__icon" src=${DROPDOWN_ICON} />
    </button>`;
  };

  this.render();
}
