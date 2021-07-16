import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import BaeminInput from '../BaeminInput/BaeminInput.js';

export default function BaeminInputField({ $selector, type, label, placeholder, errorMessage, onChange }) {
  this.$BaeminInputField = createDOMwithSelector('div', '.baemin-input-field');
  this.$BaeminLabel = createDOMwithSelector('label', '.baemin-input-field__label');
  this.$ErrorMessage = createDOMwithSelector('small', '.baemin-input-field__error-msg');

  this.$BaeminLabel.innerText = label;
  this.$ErrorMessage.innerText = errorMessage;

  this.render = () => {
    $selector.appendChild(this.$BaeminInputField);

    this.$BaeminInputField.appendChild(this.$BaeminLabel);
    new BaeminInput({ $selector: this.$BaeminInputField, type, placeholder, onChange });
    this.$BaeminInputField.appendChild(this.$ErrorMessage);
  };

  this.render();
}
