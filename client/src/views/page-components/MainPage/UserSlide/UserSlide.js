import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function UserSlide({ $selector }) {
  this.$UserSlide = createDOMwithSelector('div', '.user-slide');
  this.$selector = $selector;
  this.$selector.appendChild(this.$UserSlide);

  this.openUserSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'user') {
      return this.$UserSlide.classList.remove('slide-trigerred');
    }

    return this.$UserSlide.classList.add('slide-trigerred');
  };

  this.render = () => {
    this.$UserSlide.innerHTML = `
      <h1>USER</h1>
    `;
  };

  this.render();
}
