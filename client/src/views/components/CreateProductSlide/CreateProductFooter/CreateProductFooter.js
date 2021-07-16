import { LOCATION_ICON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function CreateProductFooter({ $target, town }) {
  this.$CreateFooter = createDOMwithSelector('div', '.CreateProduct__footer');
  $target.appendChild(this.$CreateFooter);

  this.render = () => {
    this.$CreateFooter.innerHTML = `
      <img class="CreateProduct__footer__icon" src=${LOCATION_ICON} />
      <span>${town}</span>
    `;
  };

  this.render();
}
