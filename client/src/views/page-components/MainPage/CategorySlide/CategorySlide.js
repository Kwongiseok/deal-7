import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function CategorySlide({ $selector }) {
  this.$CategorySlide = createDOMwithSelector('div', '.category-slide');
  this.$selector = $selector;
  this.$selector.appendChild(this.$CategorySlide);

  this.openCategorySlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'category') {
      return this.$CategorySlide.classList.remove('slide-trigerred');
    }

    return this.$CategorySlide.classList.add('slide-trigerred');
  };

  this.render = () => {
    this.$CategorySlide.innerHTML = `
        <h1>CATEGORY</h1>
    `;
  };

  this.render();
}
