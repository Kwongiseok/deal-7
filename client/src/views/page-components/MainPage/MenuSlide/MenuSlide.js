import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function MenuSlide({ $selector }) {
  this.$MenuSlide = createDOMwithSelector('div', '.menu-slide');
  this.$selector = $selector;
  this.$selector.appendChild(this.$MenuSlide);

  this.openMenuSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'menu') {
      return this.$MenuSlide.classList.remove('slide-trigerred');
    }

    return this.$MenuSlide.classList.add('slide-trigerred');
  };

  this.render = () => {
    this.$MenuSlide.innerHTML = `
      <h1>MENU</h1>
    `;
  };

  this.render();
}
