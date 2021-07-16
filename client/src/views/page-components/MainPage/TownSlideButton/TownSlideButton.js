import { CLOSE_BUTTON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function TownSlideButton({ $selector, townName, isChoiced }) {
  this.$TownSlideButton = createDOMwithSelector('button', '.town-slide-button');
  this.$TownSlideButton.setAttribute('data-is-choiced', isChoiced);
  $selector.appendChild(this.$TownSlideButton);

  this.render = () => {
    this.$TownSlideButton.innerHTML = `
        <span>${townName}</span>
        <img src=${CLOSE_BUTTON} data-erase-item=erase-${townName}>
    `;
  };

  this.render();
}
