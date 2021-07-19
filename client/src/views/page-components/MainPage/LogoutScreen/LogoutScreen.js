import { LOGOUT_BUTTON, THIS_USER_MY_TEAM } from '../../../../constants/imagePath.js';
import { removeValueOnLocalStorage } from '../../../../utils/localStorageUtils.js';
import { $ } from '../../../../utils/selector.js';

export default function LogoutScreen({ $selector, username, setUserState }) {
  /**
   * Logout 요청을 합니다.
   * 1. local storage에 있는 refresh token을 제거합니다.
   * 2. MainPage.js의 state를 로그인 전으로 변경합니다.
   */
  const logout = () => {
    removeValueOnLocalStorage('refreshToken');
    setUserState({
      isLoggedIn: false,
      user: {
        accessToken: null,
        username: '',
        town: [],
      },
    });
  };

  this.render = () => {
    $selector.innerHTML = `
        <div class="logout-screen">
            <span class="logout-screen__username">${username}</span>
            <img class="logout-screen__logo" src=${THIS_USER_MY_TEAM}>
            <button class="logout-screen__button">
                <img src=${LOGOUT_BUTTON}>
            </button>
        </div>
      `;

    $('.logout-screen__button').addEventListener('click', logout);
  };

  this.render();
}
