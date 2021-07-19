import LoginFieldset from '../LoginFieldset/LoginFieldset.js';

import AuthAPI from '../../../../apis/authAPI.js';
import { LOGIN_BUTTON, LOGIN_LOGO } from '../../../../constants/imagePath.js';
import { ID_REGEX } from '../../../../constants/regex.js';
import { serverErrorMessages } from '../../../../constants/serverErrorMessages.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import { setValueOnLocalStorage } from '../../../../utils/localStorageUtils.js';
import { $ } from '../../../../utils/selector.js';

export default function LoginScreen({ $selector, setUserState }) {
  // state
  this.state = {
    name: '',
    isNameValid: true,
  };

  this.setNameState = ({ name }) => {
    $('.baemin-input-field__error-msg', this.$LoginForm).classList.add('hide');
    this.state = { name, isNameValid: ID_REGEX.test(name) };
  };

  // function

  /**
   * 유저가 비정상적인 요청을 했을 때,
   * error message를 보여줍니다.
   */
  const showErrorMessage = (type) => {
    $('.baemin-input-field__error-msg', this.$LoginForm).classList.remove('hide');
    $('.baemin-input-field__error-msg', this.$LoginForm).innerText = serverErrorMessages[type];
  };

  /**
   * 아이디 submit 이벤트에 대응합니다.
   * 사용자가 정규식에 맞지 않는 ID를 입력하면 error.
   * 서버가 error를 뱉는 경우 errorMessage 출력.
   * 정상적인 요청일 경우,
   * 1. refresh token을 local storage에 저장합니다.
   * 2. access token과 유저 정보들을 MainPage.js 의 state에 저장합니다.
   */
  this.onSubmit = (e) => {
    e.preventDefault();

    const { name, isNameValid } = this.state;
    if (!isNameValid) return showErrorMessage('RECEIVE_INVALID_ID');

    AuthAPI.requestLogin({ name }).then((res) => {
      if (res.status === 'error') return showErrorMessage(res.message);

      const { userDataRows, token } = res;
      const { accessToken, refreshToken } = token;
      setValueOnLocalStorage('refreshToken', refreshToken);
      setUserState({ isLoggedIn: true, user: { accessToken, ...userDataRows[0] } });
    });
  };

  this.render = () => {
    $selector.innerHTML = `
        <div class="login-screen">
            <img src=${LOGIN_LOGO} class="login-screen__logo">
            <form class="login-form"></form>
        </div>
    `;

    this.$LoginForm = document.querySelector('.login-form');
    this.$LoginFormSubmitButton = createDOMwithSelector('button', '.login-form__submit');
    this.$LoginFormSubmitButton.innerHTML = `<img src=${LOGIN_BUTTON}>`;

    new LoginFieldset({ $selector: this.$LoginForm, onChange: (name) => this.setNameState({ name }) });

    this.$LoginForm.appendChild(this.$LoginFormSubmitButton);
    this.$LoginForm.addEventListener('submit', this.onSubmit);
  };

  this.render();
}
