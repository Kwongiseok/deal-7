import AuthAPI from '../../../../apis/authAPI.js';
import { JOIN_WITH_ME, SIGNUP_BUTTON } from '../../../../constants/imagePath.js';
import { ID_REGEX } from '../../../../constants/regex.js';
import { serverErrorMessages } from '../../../../constants/serverErrorMessages.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import { $, $$ } from '../../../../utils/selector.js';
import SignupFieldset from '../SignupFieldset/SignupFieldset.js';

export default function SignupScreen({ $selector, setSlideTabState }) {
  this.state = {
    name: '',
    town: '',
    isNameValid: false,
  };

  this.setNameState = ({ name }) => {
    const idErrorField = $$('.baemin-input-field__error-msg', this.$SignupForm)[0];
    idErrorField.classList.add('hide');
    this.state = { ...this.state, name, isNameValid: ID_REGEX.test(name) };
  };

  this.setTownState = (nextState) => {
    const townErrorField = $$('.baemin-input-field__error-msg', this.$SignupForm)[1];
    townErrorField.classList.add('hide');
    this.state = { ...this.state, ...nextState };
  };

  // function

  /**
   * 유저가 비정상적인 요청을 했을 때,
   * error message를 보여줍니다.
   * 에러는 ID일 경우와 town일 경우 두 가지가 있습니다.
   */
  const showErrorMessage = (type) => {
    let target;

    const [idErrorField, townErrorField] = $$('.baemin-input-field__error-msg', this.$SignupForm);
    if (type === 'RECEIVE_EMPTY_TOWN') target = townErrorField;
    else target = idErrorField;

    target.classList.remove('hide');
    target.innerText = serverErrorMessages[type];
  };

  /**
   * 사용자가 정규식에 맞지 않는 ID를 입력하면 error.
   * 서버가 error를 뱉는 경우 errorMessage 출력.
   * 정상적인 요청일 경우,
   * 회원가입 alert와 slide tab을 로그인 탭으로 변경합니다.
   */
  this.onSubmit = (e) => {
    e.preventDefault();

    const { name, town, isNameValid } = this.state;
    if (!isNameValid) return showErrorMessage('RECEIVE_INVALID_ID');

    AuthAPI.requestSignup({ name, town }).then((res) => {
      if (res.status === 'error') return showErrorMessage(res.message);
      alert('회원가입이 완료되었어요!');
      setSlideTabState({ isLoginScreen: true });
    });
  };

  this.render = () => {
    $selector.innerHTML = `
      <div class="signup-screen">
        <img src=${JOIN_WITH_ME} class="signup-screen__logo">
        <form class="signup-form"></form>
      </div>
    `;

    this.$SignupForm = document.querySelector('.signup-form');
    new SignupFieldset({
      $selector: this.$SignupForm,
      onChangeEvents: {
        setNameState: this.setNameState,
        setTownState: this.setTownState,
      },
    });

    this.$SignupFormSubmitButton = createDOMwithSelector('button', '.signup-form__submit');
    this.$SignupFormSubmitButton.innerHTML = `<img src=${SIGNUP_BUTTON}>`;
    this.$SignupForm.appendChild(this.$SignupFormSubmitButton);

    this.$SignupForm.addEventListener('submit', this.onSubmit);
  };

  this.render();
}
