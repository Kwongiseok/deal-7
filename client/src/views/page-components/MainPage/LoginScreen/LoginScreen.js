import { LOGIN_BUTTON, LOGIN_LOGO } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import LoginFieldset from '../LoginFieldset/LoginFieldset.js';

export default function LoginScreen({ $selector }) {
  this.render = () => {
    $selector.innerHTML = `
        <div class="login-screen">
            <img src=${LOGIN_LOGO} class="login-screen__logo">
            <form class="login-form"></form>
        </div>
    `;

    this.$LoginForm = document.querySelector('.login-form');
    new LoginFieldset({ $selector: this.$LoginForm });

    this.$LoginFormSubmitButton = createDOMwithSelector('button', '.login-form__submit');
    this.$LoginFormSubmitButton.innerHTML = `<img src=${LOGIN_BUTTON}>`;
    this.$LoginForm.appendChild(this.$LoginFormSubmitButton);
  };

  this.render();
}
