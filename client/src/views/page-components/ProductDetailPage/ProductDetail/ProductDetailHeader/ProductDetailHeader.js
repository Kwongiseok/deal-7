import { DROPDOWN_ICON, LEFT_ICON } from '../../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function ProductDetailHeader({ $target, initialState, onClickOptionHandler }) {
  /**
   * this.state = {
   *  isSeller : boolean
   * }
   */
  this.state = initialState;
  this.onClickOptionHandler = onClickOptionHandler;
  this.$productDetailHeader = createDOMwithSelector('div', '.productDetailHeader');
  this.$productDetailHeader.addEventListener('click', (e) => {
    const link = e.target.closest('button')?.dataset.link;
    if (link === 'back') {
      history.back();
    } else if (link === 'more') {
      this.onClickOptionHandler();
    }
  });

  $target.appendChild(this.$productDetailHeader);

  this.sellerRender = () => {
    const renderHtml = this.state.isSeller
      ? `<button class="productDetailHeader__option" data-link="more">
  <img class="productDetailHeader__icon" src=${DROPDOWN_ICON} />
</button>`
      : '';
    return renderHtml;
  };

  this.render = () => {
    this.$productDetailHeader.innerHTML =
      `
    <button class="productDetailHeader__back" data-link="back">
      <img class="productDetailHeader__icon" src=${LEFT_ICON} />
    </button>` + this.sellerRender();
  };

  this.render();
}
