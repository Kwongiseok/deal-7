import { SAMPLE_PRODUCTS_STATE } from '../../../dummy-file.js';
import CreateProductButton from './CreateProductButton/CreateProductButton.js';
import MainPageNavBar from './MainPageNavBar/MainPageNavBar.js';
import ProductsWrap from './ProductsWrap/ProductsWrap.js';

function MainPage() {
  /**
   * State
   * currentlyopendSlide
   * - 현재 오픈되어 있는 슬라이드 입니다.
   * - 들어올 수 있는 값은 null | category | user | town | createProduct | menu 입니다.
   */
  this.state = {
    products: SAMPLE_PRODUCTS_STATE,
    currentlyOpenedSlide: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;

    console.log(this.state);
  };

  // render
  const body = document.querySelector('#root');
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

  // Events
  this.setCurrentlyOpenedSlide = (val) => {
    this.setState({ ...this.state, currentlyOpenedSlide: val });
  };

  const bindEvents = () => {
    document.addEventListener('click', ({ target }) => {
      const value = getSlideItemValue(target);
      this.setCurrentlyOpenedSlide(value);
    });
  };

  bindEvents();
}

new MainPage();

/**
 * 요소들을 클릭 시,
 * 슬라이드를 일으키는 요소일 경우
 * 해당 아이템을 state에 반영합니다.
 * 등록되어 있지 않은 요소를 클릭 시 null을 반환합니다.
 */
const getSlideItemValue = (target) => {
  const {
    dataset: { slideItem },
  } = target;

  if (!slideItem) return null;
  return slideItem;
};
