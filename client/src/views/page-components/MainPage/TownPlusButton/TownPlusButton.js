import { ADD_ICON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function TownPlusButton({ $selector }) {
  this.$TownPlusButton = createDOMwithSelector('button', '.town-plus-button');
  $selector.appendChild(this.$TownPlusButton);

  this.render = () => {
    this.$TownPlusButton.innerHTML = `<img src=${ADD_ICON}>`;
  };

  this.render();
}
