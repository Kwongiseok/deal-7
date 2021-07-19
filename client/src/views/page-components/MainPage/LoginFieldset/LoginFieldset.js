import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import BaeminInputField from '../../../components/BaeminInputField/BaeminInputField.js';

export default function LoginFieldset({ $selector, onChange }) {
  this.$LoginFieldset = createDOMwithSelector('fieldset', '.login-fieldset');
  this.$LoginFieldset.innerHTML = '<legend>Login</legend>';

  new BaeminInputField({
    $selector: this.$LoginFieldset,
    type: 'text',
    label: '아이디',
    placeholder: '영문, 숫자 조합 20자 이하여야 해요.',
    onChange,
  });

  this.render = () => {
    $selector.appendChild(this.$LoginFieldset);
  };

  this.render();
}
