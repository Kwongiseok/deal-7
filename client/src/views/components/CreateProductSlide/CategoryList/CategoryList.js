import { CATEGORY_LIST } from '../../../../constants/categoryList.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function CategoryList({ $target, onClickHandler, initialState }) {
  this.state = initialState; // {title: '', category : '' }
  this.category_list = [...CATEGORY_LIST].sort(() => Math.random() - Math.random());

  this.$categoryListContainer = createDOMwithSelector('div', '.categoryList__container');
  this.$categoryListTitle = createDOMwithSelector('p', '.categoryList__title');
  this.$categoryListTitle.innerText = '(필수)카테고리를 선택해주세요.';

  this.$categoryList = createDOMwithSelector('ul', '.categoryList');

  this.onClickHandler = (e) => {
    const category = e.target.closest('li')?.dataset.category;
    onClickHandler(category);
  };

  $target.appendChild(this.$categoryListContainer);
  this.$categoryListContainer.appendChild(this.$categoryListTitle);
  this.$categoryListContainer.appendChild(this.$categoryList);
  this.$categoryList.addEventListener('click', this.onClickHandler);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.convertToHTML();
  };

  this.convertToHTML = () => {
    const html = this.category_list
      .map((category) => {
        if (category === this.state.category) {
          return `<li class="categoryList__category category__clicked" data-category=${category}>${category}</li>`;
        }
        return `<li class="categoryList__category" data-category=${category}>${category}</li>`;
      })
      .join('');
    this.$categoryList.innerHTML = html;
  };

  this.render();
}
