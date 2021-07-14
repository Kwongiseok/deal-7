export default function PriceInput({ $target, onInputHandler, initialState }) {
  this.state = initialState; // { price : '' }

  this.$priceInput = document.createElement('input');
  $target.appendChild(this.$priceInput);

  this.$priceInput.placeholder = '₩ 가격(선택사항)';

  this.$priceInput.addEventListener('input', onInputHandler);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$priceInput.value = this.state.price;
  };

  this.render();
}
