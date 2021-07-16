import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatDetailPageBody({ $target, initialState }) {
  this.state = [
    {
      isMine: true,
      text: '안녕하세요! 궁금한게 있는데요!',
    },
    {
      isMine: false,
      text: '네 안녕하세요!',
    },
    {
      isMine: true,
      text: '혹시',
    },
    {
      isMine: true,
      text: '실제로 신어볼 수 있는건가요??',
    },
  ];
  // this.state = initialState;
  this.$body = createDOMwithSelector('div', '.chatDetailPageBody');
  $target.appendChild(this.$body);

  this.render = () => {
    const convertedHtml = this.state
      .map((chat) => {
        return this.checkWhoseChat(chat.isMine, chat.text);
      })
      .join('');
    this.$body.innerHTML = convertedHtml;
  };

  this.checkWhoseChat = (isMine, text) => {
    if (isMine) {
      return `
      <div class="my__chat__container">
        <div class="my__chat__wrapper">
          <span class="my__chat">${text}</span>
        </div>
      </div>`;
    } else {
      return `
      <div class="opponent__chat__container">
        <div class="opponent__chat__wrapper">
          <span class="opponent__chat">${text}</span>
        </div>
      </div>
      `;
    }
  };
  this.render();
}
