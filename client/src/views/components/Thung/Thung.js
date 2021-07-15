import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import { THUNG } from '../../../constants/imagePath.js';

export default function Thung({ $selector, message }) {
  this.$Thung = createDOMwithSelector('div', '.thung');
  this.$Thung.innerHTML = `
        <img src=${THUNG}>
        <span>${message}</span>    
    `;

  this.render = () => {
    console.log(this.$Thung);
    $selector.appendChild(this.$Thung);
  };

  this.render();
}
