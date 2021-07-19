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
   * currentlyOpenedSlide
   * - 현재 오픈되어 있는 슬라이드 입니다.
   * - 들어올 수 있는 값은 null | category | user | town | create | menu 입니다.
   */
  this.state = {
    products: SAMPLE_PRODUCTS_STATE,
    currentlyOpenedSlide: null,
    isTownModalOpened: false,
    productFilter: {
      town: '역삼동',
      category: null,
    },
    isLoggedIn: false,
    user: {
      accessToken: '',
      town: [],
      username: '',
    },
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.setUserState = (userState) => {
    this.setState({ ...this.state, ...userState });
    console.log(this.state);
    this.renderComponenetRelatedUserState();
  };

  // Events

  this.setCurrentlyOpenedSlide = (val) => {
    this.setState({ ...this.state, currentlyOpenedSlide: val });
  };

  this.setTownModalOpenedState = (state = 'open') => {
    const willModalOpen = state === 'open' ? true : false;
    this.setState({ ...this.state, isTownModalOpened: willModalOpen });
  };

  this.changeTownFilterValue = ({ town }) => {
    this.setState({ ...this.state, productFilter: { ...this.state.productFilter, town } });
    $MainPageNavBar.setState({ currentTown: this.state.productFilter.town, userTowns: this.state.user.town });
    $TownSlide.setState({ currentTown: this.state.productFilter.town, towns: this.state.user.town });
  };

  this.changeUserTownState = ({ town }) => {
    this.setState({ ...this.state, user: { ...this.state.user, town } });
    $TownModal.setState({ userTowns: this.state.user.town });
    $TownSlide.setState({ currentTown: this.state.productFilter.town, towns: this.state.user.town });
  };

  this.setCategoryFilter = (category) => {
    if (this.state.productFilter.category === category) {
      return this.setState({ ...this.state, productFilter: { ...this.state.productFilter, category: null } });
    }
    return this.setState({ ...this.state, productFilter: { ...this.state.productFilter, category } });
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

  const $MainPageNavBar = new MainPageNavBar({
    $selector: this.$header,
    currentTown: this.state.productFilter.town,
  });
  new ProductsWrap({ $selector: this.$main, products: this.state.products });
  new CreateProductButton({ $selector: this.$MainScreen });
  const $CategorySlide = new CategorySlide({
    $selector: body,
    currentCategory: this.state.productFilter.category,
    setCategoryFilter: this.setCategoryFilter,
  });
  const $UserSlide = new UserSlide({
    $selector: body,
    isLoggedIn: this.state.isLoggedIn,
    user: this.state.user,
    setUserState: this.setUserState,
  });
  const $MenuSlide = new MenuSlide({ $selector: body });
  const $CreateProductSlide = new CreateProductSlide({
    $selector: body,
    setCurrentlyOpenedSlide: this.setCurrentlyOpenedSlide,
  });
  const $TownSlide = new TownSlide({
    $selector: body,
    currentTown: this.state.productFilter.town,
    towns: this.state.user.town,
    setTownFilter: this.changeTownFilterValue,
    setUserTown: this.changeUserTownState,
  });

  const $TownModal = new TownModal({
    $selector: body,
    userTowns: this.state.user.town,
    setTownModalOpenedState: this.setTownModalOpenedState,
    setCurrentlyOpenedSlide: this.setCurrentlyOpenedSlide,
    setTown: this.changeTownFilterValue,
  });

  this.render = () => {
    triggerSlides(this.state.currentlyOpenedSlide);
    triggerTownModal(this.state.isTownModalOpened);
    $CategorySlide.setState({ currentCategory: this.state.productFilter.category });
  };

  const triggerSlides = (slideState) => {
    $CategorySlide.openCategorySlide(slideState);
    $UserSlide.openUserSlide(slideState);
    $MenuSlide.openMenuSlide(slideState);
    $CreateProductSlide.openCreateProductSlide(slideState);
    $TownSlide.openTownSlide(slideState);
  };

  const triggerTownModal = (isTownModalOpened) => $TownModal.showTownModal(isTownModalOpened);

  this.renderComponenetRelatedUserState = () => {
    const { isLoggedIn, user } = this.state;
    $UserSlide.setState({ isLoggedIn, user });
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
