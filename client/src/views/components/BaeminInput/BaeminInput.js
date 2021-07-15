import { UNDERLINE_BLACK_COLOR } from '../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';

export default function BaeminInput({ $selector, type, placeholder, maxLength = 25 }) {
  this.$BaeminInputWrap = createDOMwithSelector('div', '.baemin-input-wrap');
  this.$BaeminInput = createDOMwithSelector('input', '.baemin-input');
  this.$BaeminInput.setAttribute('type', type);
  this.$BaeminInput.setAttribute('placeholder', placeholder);
  this.$BaeminInput.setAttribute('maxlength', maxLength);
  this.$BaeminInputUnderline = createDOMwithSelector('img', '.baemin-input-underline');
  this.$BaeminInputUnderline.setAttribute('src', UNDERLINE_BLACK_COLOR);

  this.$BaeminInputWrap.appendChild(this.$BaeminInput);
  this.$BaeminInputWrap.appendChild(this.$BaeminInputUnderline);

  this.render = () => {
    $selector.appendChild(this.$BaeminInputWrap);
  };

  this.render();
}
