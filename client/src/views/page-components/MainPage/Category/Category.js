import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function Category({ $selector, infos }) {
  this.$CategoryGridItemWrap = createDOMwithSelector('div', '.category-grid__item-wrap');
  $selector.appendChild(this.$CategoryGridItemWrap);

  this.render = () => {
    this.$CategoryGridItemWrap.innerHTML = `
        <span>${infos}</span>
    `;
  };

  this.render();
}
