import { getChats, outChatRooms } from '../../../apis/chatAPI.js';
import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import ChatDetailPageBody from './ChatDetailPageBody/ChatDetailPageBody.js';
import ChatDetailPageFooter from './ChatDetailPageFooter/ChatDetailPageFooter.js';
import ChatDetailPageProduct from './ChatDetailPageProduct/ChatDetailPageProduct.js';
import ChatDetailPageHeader from './ChatDetaiPageHeader/ChatDetailPageHeader.js';
import ChatRoomAlertModal from './ChatRoomAlertModal/ChatRoomAlertModal.js';

export default function ChatDetailPage() {
  this.state = {
    roomId: '',
    name: '',
    chats: [],
  };
  const PRODUCT_ID = 1234;
  const BUYER_ID = 1244;
  const SELLER_ID = 144;
  const $target = document.querySelector('#root');

  // TODO: 접속한 url으로부터 id 값들을 받아와서 넣어줘야한다.
  this.webSocket = new WebSocket(`ws://localhost:8080/chat/${PRODUCT_ID}/${BUYER_ID}/${SELLER_ID}`);

  this.webSocket.onmessage = (message) => {
    this.setState({ ...this.state, chats: [...this.state.chats, { text: message.data, isMine: false }] });
  };

  this.$chatDetailPage = createDOMwithSelector('div', '.chatDetailPage');

  $target.appendChild(this.$chatDetailPage);

  const chatAlertModal = new ChatRoomAlertModal({
    $target,
    onOutHandler: async () => {
      await outChatRooms(this.state.roomId);
      history.back();
    },
  });

  const chatHeader = new ChatDetailPageHeader({
    $target: this.$chatDetailPage,
    onClickOutHandler: () => {
      chatAlertModal.showModal();
    },
    initialState: { name: this.state.name },
  });

  new ChatDetailPageProduct({ $target: this.$chatDetailPage });

  const chatBody = new ChatDetailPageBody({ $target: this.$chatDetailPage, initialState: { chats: this.state.chats } });

  new ChatDetailPageFooter({
    $target: this.$chatDetailPage,
    onSendChatHandler: (chat) => {
      this.webSocket.send(chat);
      this.setState({ ...this.state, chats: [...this.state.chats, { isMine: true, text: chat }] });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    chatHeader.setState({ name: this.state.name });
    chatBody.setState({ ...chatBody.state, chats: this.state.chats });
  };

  window.onload = () =>
    getChats(`/chat/${PRODUCT_ID}/${BUYER_ID}/${SELLER_ID}`).then((res) => this.setState({ ...this.state, ...res }));
}

new ChatDetailPage();
