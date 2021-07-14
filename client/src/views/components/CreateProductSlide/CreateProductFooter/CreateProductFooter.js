import { LOCATION_ICON } from '../../../../constants/imagePath.js';

export default function CreateProductFooter({ $target, town }) {
  this.$CreateFooter = document.createElement('div');
  $target.appendChild(this.$CreateFooter);

  this.render = () => {
    this.$CreateFooter.innerHTML = `<div>
      <img src="${LOCATION_ICON}" />
      <span>${town}</span>
    </div>`;
  };

  this.render();
}
