import { JOIN_WITH_ME, SIGNUP_BUTTON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import SignupFieldset from '../SignupFieldset/SignupFieldset.js';

export default function SignupScreen({ $selector }) {
  this.render = () => {
    $selector.innerHTML = `
      <div class="signup-screen">
        <img src=${JOIN_WITH_ME} class="signup-screen__logo">
        <form class="signup-form"></form>
      </div>
    `;

    this.$SignupForm = document.querySelector('.signup-form');
    new SignupFieldset({ $selector: this.$SignupForm });

    this.$SignupFormSubmitButton = createDOMwithSelector('button', '.signup-form__submit');
    this.$SignupFormSubmitButton.innerHTML = `<img src=${SIGNUP_BUTTON}>`;
    this.$SignupForm.appendChild(this.$SignupFormSubmitButton);
  };

  this.render();
}
