import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function TownSlide({ $selector }) {
  this.$TownSlide = createDOMwithSelector('div', '.town-slide');
  this.$selector = $selector;
  this.$selector.appendChild(this.$TownSlide);

  this.openTownSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'town') {
      return this.$TownSlide.classList.remove('slide-trigerred');
    }

    return this.$TownSlide.classList.add('slide-trigerred');
  };

  this.render = () => {
    this.$TownSlide.innerHTML = `
      <h1>TOWN</h1>
    `;
  };

  this.render();
}
