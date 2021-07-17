import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import formatPrice from '../../../../utils/formatPrice.js';

export default function PriceInput({ $target, onInputHandler, initialState }) {
  this.state = initialState; // { price : '' }
  this.onInputHandler = onInputHandler;
  this.$priceInput = createDOMwithSelector('input', '.CreateProduct__price');
  $target.appendChild(this.$priceInput);

  this.$priceInput.placeholder = '가격(선택사항)';

  this.$priceInput.addEventListener('input', this.onInputHandler);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.price) {
      this.$priceInput.value = formatPrice(this.state.price);
    }
  };

  this.render();
}
