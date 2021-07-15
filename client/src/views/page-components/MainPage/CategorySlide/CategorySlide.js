import { CATEGORY_LIST } from '../../../../constants/categoryList.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import Category from '../Category/Category.js';

export default function CategorySlide({ $selector, setCategoryFilter }) {
  this.$CategorySlide = createDOMwithSelector('div', '.category-slide');
  $selector.appendChild(this.$CategorySlide);

  this.state = {
    currentCategory: null,
  };

  this.openCategorySlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'category') {
      return this.$CategorySlide.classList.remove('slide-trigerred');
    }

    return this.$CategorySlide.classList.add('slide-trigerred');
  };

  // state

  this.setState = (nextState) => {
    this.state = nextState;
    this.checkCurrentCategory(this.state.currentCategory);
  };

  this.checkCurrentCategory = (currentCategory) => {
    this.render(currentCategory);
  };

  // event
  const bindEvents = () => {
    this.$CategorySlide.addEventListener('click', (e) => {
      const {
        target: {
          dataset: { category },
        },
      } = e;

      if (!category) return;
      setCategoryFilter(category);
    });
  };

  // render;
  this.render = (currentCategory) => {
    this.$CategorySlide.innerHTML = `
        <h2 class="category-slide__title">카테고리</h2>
        <div class="category-main">
          <div class="category-grid">
          </div>
        </div>
    `;

    createCategoriesDOM(document.querySelector('.category-grid'), currentCategory);
  };

  this.render();
  bindEvents();
}

const createCategoriesDOM = ($selector, currentCategory) => {
  CATEGORY_LIST.forEach((category) => {
    new Category({ $selector, infos: { category, isChoiced: currentCategory === category } });
  });
};
