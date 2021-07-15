import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import LoginScreen from '../LoginScreen/LoginScreen.js';
import LogoutScreen from '../LogoutScreen/LogoutScreen.js';
import SignupScreen from '../SignupScreen/SignupScreen.js';

export default function UserSlide({ $selector }) {
  this.$UserSlide = createDOMwithSelector('div', '.user-slide');
  $selector.appendChild(this.$UserSlide);

  this.openUserSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'user') {
      return this.$UserSlide.classList.remove('slide-trigerred');
    }

    return this.$UserSlide.classList.add('slide-trigerred');
  };

  //state
  this.state = {
    username: 'jong951005@gmail.com',
    isLoggedIn: false,
    isLoginScreen: true,
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  //Events
  const bindEvents = () => {
    document.addEventListener('click', ({ target }) => changeLoginScreenStatus(target));
  };

  /**
   * 로그인을 클릭할 경우, isLoginScreen을 true로 만듭니다.
   * 회원가입을 클릭할 경우, isLoginScreen을 false로 만듭니다.
   */
  const changeLoginScreenStatus = (target) => {
    if (target.closest('[data-slide-status=login]')) {
      this.setState({ isLoginScreen: true });
    }

    if (target.closest('[data-slide-status=signup]')) {
      this.setState({ isLoginScreen: false });
    }
  };

  //render
  this.render = () => {
    const { isLoggedIn, isLoginScreen } = this.state;

    this.$UserSlide.innerHTML = `
      ${returnSlideTitleDOM(isLoggedIn, isLoginScreen)}
      <div class="user-slide__main"></div>
    `;

    this.$UserSlideMain = document.querySelector('.user-slide__main');

    if (!isLoggedIn && isLoginScreen) {
      renderLoginScreen(this.$UserSlideMain);
    }

    if (!isLoggedIn && !isLoginScreen) {
      renderSignupScreen(this.$UserSlideMain);
    }

    if (isLoggedIn) {
      renderUserScreen(this.$UserSlideMain, this.state.username);
    }
  };

  this.render();
  bindEvents();
}

const renderLoginScreen = ($selector) => new LoginScreen({ $selector });
const renderSignupScreen = ($selector) => new SignupScreen({ $selector });
const renderUserScreen = ($selector, username) => new LogoutScreen({ $selector, username });

/**
 * 로그인 되어있을 경우,
 * Slide Title은 내 계정만 반환합니다.
 * 그렇지 않으면 로그인, 회원가입을 반환합니다.
 */
const returnSlideTitleDOM = (isLoggedIn, isLoginScreen) => {
  if (isLoggedIn) return `<h2 class="user-slide__title my-account">내 계정</h2>`;

  if (isLoginScreen)
    return `
    <h2 class="user-slide__title login" data-slide-status='login'>로그인</h2>
    <h2 class="user-slide__title signup not-choiced" data-slide-status='signup'>회원가입</h2>
  `;
  return `
    <h2 class="user-slide__title login not-choiced" data-slide-status='login'>로그인</h2>
    <h2 class="user-slide__title signup" data-slide-status='signup'>회원가입</h2>
  `;
};
