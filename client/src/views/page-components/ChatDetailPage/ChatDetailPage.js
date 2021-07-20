import { getChats, outChatRooms } from '../../../apis/chatAPI.js';
import { checkUserLoginStatus } from '../../../utils/checkUserLoginStatus.js';
import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import { $ } from '../../../utils/selector.js';
import ChatDetailPageBody from './ChatDetailPageBody/ChatDetailPageBody.js';
import ChatDetailPageFooter from './ChatDetailPageFooter/ChatDetailPageFooter.js';
import ChatDetailPageProduct from './ChatDetailPageProduct/ChatDetailPageProduct.js';
import ChatDetailPageHeader from './ChatDetaiPageHeader/ChatDetailPageHeader.js';
import ChatRoomAlertModal from './ChatRoomAlertModal/ChatRoomAlertModal.js';

export default function ChatDetailPage() {
  const PRODUCT_ID = 1;
  const BUYER_ID = 2;
  const SELLER_ID = 3;

  checkUserLoginStatus.then(({ isLoggedIn, res }) => {
    if (!isLoggedIn) return; // 메인 URL 추가할 예정
    this.webSocket = new WebSocket(
      `ws://localhost:8080/chat/${PRODUCT_ID}/${BUYER_ID}/${SELLER_ID}/${res.token.accessToken}`
    );
    this.webSocket.onmessage = (message) => {
      this.setState({ ...this.state, chats: [...this.state.chats, { text: message.data, isMine: false }] });
    };
    this.setUserState({
      isLoggedIn: true,
      user: {
        accessToken: res.token.accessToken,
      },
    });
    getChats(`/chat/${PRODUCT_ID}/${BUYER_ID}/${SELLER_ID}`, res.token.accessToken).then((data) =>
      this.setState({ ...this.state, ...data })
    );
  });

  this.state = {
    roomId: '',
    name: '',
    chats: [],
  };
  this.userState = {};

  const $target = $('#root');

  // TODO: 접속한 url으로부터 id 값들을 받아와서 넣어줘야한다.
  console.log(location.pathname);
  this.webSocket = null;

  this.$chatDetailPage = createDOMwithSelector('div', '.chatDetailPage');

  $target.appendChild(this.$chatDetailPage);

  const chatAlertModal = new ChatRoomAlertModal({
    $target,
    onOutHandler: async () => {
      await outChatRooms(this.state.roomId, this.userState.user.accessToken);
      history.back();
    },
  });

  const chatHeader = new ChatDetailPageHeader({
    $target: this.$chatDetailPage,
    onClickOutHandler: () => {
      chatAlertModal.showModal();
    },
    onClickBackHandler: async () => {
      if (this.state.name && this.state.roomId && this.state.chats.length === 0) {
        await outChatRooms(this.state.roomId);
      }
      history.back();
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

  this.setUserState = (userState) => {
    this.userState = userState;
  };

  // window.onload = () =>
}

new ChatDetailPage();
