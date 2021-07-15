import { LOGOUT_BUTTON, THIS_USER_MY_TEAM } from '../../../../constants/imagePath.js';

export default function LogoutScreen({ $selector, username }) {
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
  };

  this.render();
}
