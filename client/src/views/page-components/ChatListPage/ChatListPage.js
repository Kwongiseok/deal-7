import { getChatRooms } from '../../../apis/chatAPI.js';
import ChatListPageHeader from './ChatListPageHeader/ChatListPageHeader.js';
import ChatRoomList from './ChatRoomList/ChatRoomList.js';

export default function ChatListPage() {
  this.state = [];
  this.$chatListPage = document.querySelector('#root');

  new ChatListPageHeader({ $target: this.$chatListPage });

  const chatRoomList = new ChatRoomList({ $target: this.$chatListPage, initialState: this.state });

  this.setState = (nextState) => {
    this.state = nextState;
    chatRoomList.setState(nextState);
  };

  window.onload = () => {
    getChatRooms(1234).then((data) => this.setState(data));
  };
}

new ChatListPage();
