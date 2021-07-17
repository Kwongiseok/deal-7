import { ADD_PRODUCT_BUTTON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function CreateProductButton({ $selector }) {
  this.$AddProductBtn = createDOMwithSelector('div', '.add-product-btn');
  this.$AddProductBtn.setAttribute('data-slide-item', 'create');
  $selector.appendChild(this.$AddProductBtn);

  this.render = () => {
    this.$AddProductBtn.innerHTML = `
      <img class="add-img" src=${ADD_PRODUCT_BUTTON} data-slide-item="create">
    `;
  };

  this.render();
}
