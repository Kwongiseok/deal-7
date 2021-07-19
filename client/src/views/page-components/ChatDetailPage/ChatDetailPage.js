import { getChats } from '../../../apis/chatAPI.js';
import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import ChatDetailPageBody from './ChatDetailPageBody/ChatDetailPageBody.js';
import ChatDetailPageFooter from './ChatDetailPageFooter/ChatDetailPageFooter.js';
import ChatDetailPageProduct from './ChatDetailPageProduct/ChatDetailPageProduct.js';
import ChatDetailPageHeader from './ChatDetaiPageHeader/ChatDetailPageHeader.js';
import ChatRoomAlertModal from './ChatRoomAlertModal/ChatRoomAlertModal.js';

export default function ChatDetailPage() {
  this.state = {
    chats: [],
  };
  const PRODUCT_ID = 1234;
  const BUYER_ID = 123;
  const SELLER_ID = 144;
  const $target = document.querySelector('#root');

  this.webSocket = new WebSocket(`ws://localhost:8080/chat/${PRODUCT_ID}/${BUYER_ID}/${SELLER_ID}`);

  this.webSocket.onmessage = (message) => {
    this.setState({ ...this.state, chats: [...this.state.chats, { text: message.data, isMine: false }] });
  };

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
      this.webSocket.send(chat);
      // TODO: API 요청
      this.setState({ ...this.state, chats: [...this.state.chats, { isMine: true, text: chat }] });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    chatBody.setState({ ...chatBody.state, chats: this.state.chats });
  };

  window.onload = () =>
    getChats(`/chat/${PRODUCT_ID}/${BUYER_ID}/${SELLER_ID}`).then((res) =>
      this.setState({ ...this.state, chats: [...this.state.chats, ...res] })
    );
}

new ChatDetailPage();
