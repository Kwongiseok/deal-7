import { SAMPLE_PRODUCTS_STATE } from '../../../dummy-file.js';
import CreateProductButton from './CreateProductButton/CreateProductButton.js';
import MainPageNavBar from './MainPageNavBar/MainPageNavBar.js';
import ProductsWrap from './ProductsWrap/ProductsWrap.js';

/**
 * currentlyopendSlide
 * - 현재 오픈되어 있는 슬라이드 입니다.
 * - 들어올 수 있는 값은 null | category | user | town | createProduct | menu 입니다.
 */

function MainPage() {
  this.state = {
    products: SAMPLE_PRODUCTS_STATE,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
  };

  const body = document.querySelector('#body');
  this.$header = document.createElement('header');
  this.$main = document.createElement('main');
  this.$main.className = 'main';

  body.appendChild(this.$header);
  body.appendChild(this.$main);

  this.$NavBar = new MainPageNavBar({
    $selector: this.$header,
  });

  this.$ProductsWrap = new ProductsWrap({
    $selector: this.$main,
    products: this.state.products,
  });

  this.$CreateProductButton = new CreateProductButton({
    $selector: body,
  });
}

new MainPage();
