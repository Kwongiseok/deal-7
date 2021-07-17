import { SEND_ICON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatDetailPageFooter({ $target, onSendChatHandler }) {
  this.state = {
    text: '',
  };
  this.$footer = createDOMwithSelector('div', '.chatDetailPageFooter');

  $target.appendChild(this.$footer);
  this.$footer.innerHTML = `
      <input class="chatDetailPageFooter__input" placeholder="메시지를 입력하세요."/>
      <button class="chatDetailPageFooter__button">
        <img class="chatDetailPageFooter__icon" src="${SEND_ICON}"/>
      </button>
    `;

  this.$sendButton = document.querySelector('.chatDetailPageFooter__button');

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state.text.length > 0) {
      this.$sendButton.disabled = false;
    } else {
      this.$sendButton.disabled = true;
    }
  };

  this.bindEvent = () => {
    // $input 이벤트를 두 개로 나눈 이유 : 서로 반응하는 타이밍이 각기 달라서 문제가 생김.
    const $input = document.querySelector('.chatDetailPageFooter__input');
    $input.addEventListener('input', (e) => {
      this.setState({ text: e.target.value });
    });
    $input.onkeypress = (e) => {
      if (e.key === 'Enter') {
        onSendChatHandler(e.target.value);
        e.target.value = '';
        this.setState({ text: e.target.value });
      }
    };
  };
  this.bindEvent();

  this.render();
}
