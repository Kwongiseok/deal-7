import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import BaeminInputField from '../../../components/BaeminInputField/BaeminInputField.js';

export default function SignupFieldset({ $selector }) {
  this.$SignupFieldset = createDOMwithSelector('fieldset', '.signup-fieldset');
  this.$SignupFieldset.innerHTML = `<legend>Signup</legend>`;
  new BaeminInputField({
    $selector: this.$SignupFieldset,
    type: 'email',
    label: '아이디',
    placeholder: '영문, 숫자 조합 20자 이하여야 해요.',
    errorMessage: '아이디는 영문, 숫자 조합으로 20자 이하여야 해요.',
  });
  new BaeminInputField({
    $selector: this.$SignupFieldset,
    type: 'text',
    label: '우리 동네',
    placeholder: '시, 구 제외. 동만 입력해주세요.',
    errorMessage: '',
  });

  this.render = () => {
    $selector.appendChild(this.$SignupFieldset);
  };

  this.render();
}
