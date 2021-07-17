import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import ChatDetailPageBody from './ChatDetailPageBody/ChatDetailPageBody.js';
import ChatDetailPageFooter from './ChatDetailPageFooter/ChatDetailPageFooter.js';
import ChatDetailPageProduct from './ChatDetailPageProduct/ChatDetailPageProduct.js';
import ChatDetailPageHeader from './ChatDetaiPageHeader/ChatDetailPageHeader.js';
import ChatRoomAlertModal from './ChatRoomAlertModal/ChatRoomAlertModal.js';

export default function ChatDetailPage() {
  this.state = {
    chats: [
      {
        isMine: false,
        text: '안녕하세요! 궁금한게ㅁㄴㅇㅁㅈㅁㅈㅁ 있는데요!dㅁㄴㅇㅇㅇㅁㄴㅇㅁㅈㄷㄱㅂㅁㄴㅇㅋㅌㅇㄴㅇ',
      },
      {
        isMine: true,
        text: '네 안녕하세요!',
      },
      {
        isMine: false,
        text: '혹시',
      },
      {
        isMine: false,
        text: '실제로 신어볼 수 있는건가요??',
      },
      {
        isMine: false,
        text: '안녕하세요! 궁금한게ㅁㄴㅇㅁㅈㅁㅈㅁ 있는데요!dㅁㄴㅇㅇㅇㅁㄴㅇㅁㅈㄷㄱㅂㅁㄴㅇㅋㅌㅇㄴㅇ',
      },
      {
        isMine: true,
        text: '네 안녕하세요!',
      },
      {
        isMine: false,
        text: '혹시',
      },
      {
        isMine: false,
        text: '실제로 신어볼 수 있는건가요??',
      },
      {
        isMine: false,
        text: '안녕하세요! 궁금한게ㅁㄴㅇㅁㅈㅁㅈㅁ 있는데요!dㅁㄴㅇㅇㅇㅁㄴㅇㅁㅈㄷㄱㅂㅁㄴㅇㅋㅌㅇㄴㅇ',
      },
      {
        isMine: true,
        text: '네 안녕하세요!',
      },
      {
        isMine: false,
        text: '혹시',
      },
      {
        isMine: false,
        text: '실제로 신어볼 수 있는건가요??',
      },
    ],
  };
  const $target = document.querySelector('#root');

  this.$chatDetailPage = createDOMwithSelector('div', '.chatDetailPage');

  $target.appendChild(this.$chatDetailPage);

  const chatAlertModal = new ChatRoomAlertModal({
    $target,
    onOutHandler: () => {
      // TODO : 나가기 API 호출
    },
  });

  new ChatDetailPageHeader({
    $target: this.$chatDetailPage,
    onClickOutHandler: () => {
      chatAlertModal.showModal();
    },
  });

  new ChatDetailPageProduct({ $target: this.$chatDetailPage });

  const chatBody = new ChatDetailPageBody({ $target: this.$chatDetailPage, initialState: { chats: this.state.chats } });

  new ChatDetailPageFooter({
    $target: this.$chatDetailPage,
    onSendChatHandler: (chat) => {
      // TODO : API 요청
      this.setState({ ...this.state, chats: [...this.state.chats, { isMine: true, text: chat }] });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    chatBody.setState({ ...chatBody.state, chats: this.state.chats });
  };
}

new ChatDetailPage();
