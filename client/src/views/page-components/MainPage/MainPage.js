import { SAMPLE_PRODUCTS_STATE } from '../../../dummy-file.js';
import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import CategorySlide from './CategorySlide/CategorySlide.js';
import CreateProductButton from './CreateProductButton/CreateProductButton.js';
import CreateProductSlide from './CreateProductSlide/CreateProductSlide.js';
import MainPageNavBar from './MainPageNavBar/MainPageNavBar.js';
import MenuSlide from './MenuSlide/MenuSlide.js';
import ProductsWrap from './ProductsWrap/ProductsWrap.js';
import TownModal from './TownModal/TownModal.js';
import TownSlide from './TownSlide/TownSlide.js';
import UserSlide from './UserSlide/UserSlide.js';

function MainPage() {
  /**
   * State
   * currentlyopendSlide
   * - 현재 오픈되어 있는 슬라이드 입니다.
   * - 들어올 수 있는 값은 null | category | user | town | create | menu 입니다.
   */
  this.state = {
    products: SAMPLE_PRODUCTS_STATE,
    currentlyOpenedSlide: null,
    isTownModalOpened: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const triggerSlides = (slideState) => {
    $CategorySlide.openCategorySlide(slideState);
    $UserSlide.openUserSlide(slideState);
    $MenuSlide.openMenuSlide(slideState);
    $CreateProductSlide.openCreateProductSlide(slideState);
    $TownSlide.openTownSlide(slideState);
  };

  const triggerTownModal = (isTownModalOpened) => $TownModal.showTownModal(isTownModalOpened);

  // Events
  this.setCurrentlyOpenedSlide = (val) => {
    this.setState({ ...this.state, currentlyOpenedSlide: val });
  };

  this.setTownModalOpenedState = (state = 'open') => {
    const willModalOpen = state === 'open' ? true : false;
    this.setState({ ...this.state, isTownModalOpened: willModalOpen });
  };

  const bindEvents = () => {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.main-screen')) {
        const value = getSlideItemValue(target);
        this.setCurrentlyOpenedSlide(value);
      }

      if (target.closest('[data-item=set-town]')) {
        this.setTownModalOpenedState('open');
      } else {
        this.setTownModalOpenedState('close');
      }
    });
  };

  // render
  const body = document.querySelector('#root');
  this.$MainScreen = createDOMwithSelector('div', '.main-screen');
  body.appendChild(this.$MainScreen);

  this.$header = document.createElement('header');
  this.$main = document.createElement('main');
  this.$main.className = 'main';

  this.$MainScreen.appendChild(this.$header);
  this.$MainScreen.appendChild(this.$main);

  new MainPageNavBar({ $selector: this.$header });
  new ProductsWrap({ $selector: this.$main, products: this.state.products });
  new CreateProductButton({ $selector: this.$MainScreen });
  const $CategorySlide = new CategorySlide({ $selector: body });
  const $UserSlide = new UserSlide({ $selector: body });
  const $MenuSlide = new MenuSlide({ $selector: body });
  const $CreateProductSlide = new CreateProductSlide({ $selector: body });
  const $TownSlide = new TownSlide({ $selector: body });
  const $TownModal = new TownModal({
    $selector: body,
    setTownModalOpenedState: this.setTownModalOpenedState,
    setCurrentlyOpenedSlide: this.setCurrentlyOpenedSlide,
  });

  this.render = () => {
    triggerSlides(this.state.currentlyOpenedSlide);
    triggerTownModal(this.state.isTownModalOpened);
  };

  bindEvents();
  this.render();
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
