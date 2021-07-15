import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import BaeminInputField from '../../../components/BaeminInputField/BaeminInputField.js';

export default function LoginFieldset({ $selector }) {
  this.$LoginFieldset = createDOMwithSelector('fieldset', '.login-fieldset');
  this.$LoginFieldset.innerHTML = '<legend>Login</legend>';

  new BaeminInputField({
    $selector: this.$LoginFieldset,
    type: 'email',
    label: '아이디',
    placeholder: '영문, 숫자 조합 20자 이하여야 해요.',
    errorMessage: '아이디는 영문, 숫자 조합으로 20자 이하여야 해요.',
  });

  this.render = () => {
    $selector.appendChild(this.$LoginFieldset);
  };

  this.render();
}
