import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function CreateProductSlide({ $selector }) {
  this.$CreateProductSlide = createDOMwithSelector('div', '.create-product-slide');
  $selector.appendChild(this.$CreateProductSlide);

  this.openCreateProductSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'create') {
      return this.$CreateProductSlide.classList.remove('slide-trigerred');
    }

    return this.$CreateProductSlide.classList.add('slide-trigerred');
  };

  this.render = () => {
    this.$CreateProductSlide.innerHTML = `
      <h1>CREATE PRODUCT</h1>
    `;
  };

  this.render();
}
