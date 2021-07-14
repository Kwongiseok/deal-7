import { CATEGORY_LIST } from '../../../../constants/categoryList.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import Category from '../Category/Category.js';

export default function CategorySlide({ $selector }) {
  this.$CategorySlide = createDOMwithSelector('div', '.category-slide');
  $selector.appendChild(this.$CategorySlide);

  this.openCategorySlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'category') {
      return this.$CategorySlide.classList.remove('slide-trigerred');
    }

    return this.$CategorySlide.classList.add('slide-trigerred');
  };

  this.render = () => {
    this.$CategorySlide.innerHTML = `
        <h2 class="category-slide__title">카테고리</h2>
        <div class="category-main">
          <div class="category-grid">
          </div>
        </div>
    `;

    createCategoriesDOM(document.querySelector('.category-grid'));
  };

  this.render();
}

const createCategoriesDOM = ($selector) => {
  CATEGORY_LIST.map((category) => {
    new Category({ $selector, infos: category });
  });
};
