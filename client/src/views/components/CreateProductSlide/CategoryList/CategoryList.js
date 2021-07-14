import { CATEGORY_LIST } from '../../../../constants/categoryList.js';

export default function CategoryList({ $target, onClickHandler, initialState }) {
  this.state = initialState; // {title: '', category : '' }
  this.$categoryListContainer = document.createElement('div');
  this.$categoryListContainer.className = 'categoryList__container';
  this.$categoryListTitle = document.createElement('p');
  this.$categoryListTitle.className = 'categoryList__title';
  this.$categoryListTitle.innerText = '필수)카테고리를 선택해주세요.';
  this.$categoryList = document.createElement('ul');
  this.$categoryList.className = 'categoryList';

  this.onClickHandler = (e) => {
    const category = e.target.closest('li').dataset.category;
    onClickHandler(category);
  };

  $target.appendChild(this.$categoryListContainer);
  this.$categoryListContainer.appendChild(this.$categoryListTitle);
  this.$categoryListContainer.appendChild(this.$categoryList);
  this.$categoryListContainer.style.display = 'none';
  this.$categoryList.addEventListener('click', this.onClickHandler);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.title.length > 0) {
      this.$categoryListContainer.style.display = 'flex';
      this.convertToHTML();
    }
  };

  // this.convertToHTML = () => {
  //   const category_list = [...CATEGORY_LIST];
  //   if (this.state.title.length > 0) {
  //     this.$categoryListContainer.style.display = 'flex';
  //     let templateHtml;
  //     if (this.state.category) {
  //       this.$categoryListTitle.display = 'none';
  //       templateHtml =
  //         `<li class="categoryList__category category__clicked" data-category=${this.state.category}>
  //         ${this.state.category}
  //       </li>` +
  //         category_list
  //           .map((category) => {
  //             if (category !== this.state.category) {
  //               return `<li class="categoryList__category" data-category=${category}>${category}</li>`;
  //             }
  //             return '';
  //           })
  //           .join('');
  //     } else {
  //       templateHtml = category_list
  //         .map((category) => `<li class="categoryList__category" data-category=${category}>${category}</li>`)
  //         .join('');
  //     }
  //     this.$categoryList.innerHTML = templateHtml;
  //   }
  // };
  this.convertToHTML = () => {
    const category_list = [...CATEGORY_LIST];
    const html = category_list
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
