import { SEND_ICON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatDetailPageFooter({ $target }) {
  this.state = {
    text: '2',
  };
  this.$footer = createDOMwithSelector('div', '.chatDetailPageFooter');

  $target.appendChild(this.$footer);
  this.$footer.innerHTML = `
      <input class="chatDetailPageFooter__input" placeholder="메시지를 입력하세요."/>
      <button class="chatDetailPageFooter__button">
        <img class="chatDetailPageFooter__icon" src="${SEND_ICON}"/>
      </button>
    `;
  this.render = () => {
    const $sendButton = document.querySelector('.chatDetailPageFooter__button');
    if (this.state.text.length > 0) {
      $sendButton.disabled = false;
    } else {
      $sendButton.disabled = true;
    }
  };

  this.bindEvent = () => {
    const $input = document.querySelector('.chatDetailPageFooter__input');
    const $button = document.querySelector('.chatDetailPageFooter__button');
    $input.addEventListener('keypress', (e) => {
      console.log(e.target);
    });
  };
  this.bindEvent();

  this.render();
}
