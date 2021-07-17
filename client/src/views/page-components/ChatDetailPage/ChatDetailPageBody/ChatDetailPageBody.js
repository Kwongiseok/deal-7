import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatDetailPageBody({ $target, initialState }) {
  this.state = initialState;
  this.$body = createDOMwithSelector('div', '.chatDetailPageBody');
  $target.appendChild(this.$body);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const convertedHtml = this.state.chats
      .map((chat) => {
        return this.checkWhoseChat(chat.isMine, chat.text);
      })
      .join('');
    this.$body.innerHTML = convertedHtml;

    this.$body.scrollTop = this.$body.scrollHeight;
  };

  this.checkWhoseChat = (isMine, text) => {
    if (isMine) {
      return `
      <div class="my__chat__container">
        <div class="my__chat__wrapper">
          <div class="my__chat">${text}</div>
        </div>
      </div>`;
    } else {
      return `
      <div class="opponent__chat__container">
        <div class="opponent__chat__wrapper">
          <div class="opponent__chat">${text}</div>
        </div>
      </div>
      `;
    }
  };
  this.render();
}
