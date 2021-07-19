import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import BaeminInputField from '../../../components/BaeminInputField/BaeminInputField.js';

export default function SignupFieldset({ $selector, onChangeEvents }) {
  this.$SignupFieldset = createDOMwithSelector('fieldset', '.signup-fieldset');
  this.$SignupFieldset.innerHTML = `<legend>Signup</legend>`;

  const { setNameState, setTownState } = onChangeEvents;
  new BaeminInputField({
    $selector: this.$SignupFieldset,
    type: 'text',
    label: '아이디',
    placeholder: '영문, 숫자 조합 8~20자여야 해요.',
    onChange: (name) => setNameState({ name }),
  });
  new BaeminInputField({
    $selector: this.$SignupFieldset,
    type: 'text',
    label: '우리 동네',
    placeholder: '시, 구 제외. 동만 입력해주세요.',
    onChange: (town) => setTownState({ town }),
  });

  this.render = () => {
    $selector.appendChild(this.$SignupFieldset);
  };

  this.render();
}
