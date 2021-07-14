import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function Category({ $selector, infos: { category, isChoiced } }) {
  this.$CategoryGridItemWrap = createDOMwithSelector('div', '.category-grid__item-wrap');
  this.$CategoryGridItemWrap.setAttribute('data-category', category);
  $selector.appendChild(this.$CategoryGridItemWrap);

  this.render = () => {
    this.$CategoryGridItemWrap.innerHTML = `
        <span data-category='${category}'>${category}</span>
    `;

    setChoicedClassOnTarget(this.$CategoryGridItemWrap, isChoiced);
  };

  this.render();
}

const setChoicedClassOnTarget = ($target, isChoiced) => {
  if (!isChoiced) return $target.classList.remove('choiced');
  return $target.classList.add('choiced');
};
