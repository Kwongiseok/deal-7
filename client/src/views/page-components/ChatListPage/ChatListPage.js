import { getChatRoomsAboutProduct, getMyAllChatRooms } from '../../../apis/chatAPI.js';
import { checkUserLoginStatus } from '../../../utils/checkUserLoginStatus.js';
import ChatListPageHeader from './ChatListPageHeader/ChatListPageHeader.js';
import ChatRoomList from './ChatRoomList/ChatRoomList.js';

export default function ChatListPage() {
  checkUserLoginStatus.then(({ isLoggedIn, res }) => {
    if (!isLoggedIn) return;
    this.setUserState({
      isLoggedIn: true,
      user: {
        accessToken: res.token.accessToken,
        name: res.userDataRows[0].name,
        town: JSON.parse(res.userDataRows[0].town),
      },
    });
  });

  this.userState = {};
  this.state = [];
  this.$chatListPage = document.querySelector('#root');

  new ChatListPageHeader({ $target: this.$chatListPage });

  const chatRoomList = new ChatRoomList({ $target: this.$chatListPage, initialState: this.state });

  this.setState = (nextState) => {
    this.state = nextState;
    chatRoomList.setState(nextState);
  };
  this.setUserState = (userState) => {
    this.userState = userState;
  };

  window.onload = () => {
    // getChatRoomsAboutProduct(1234).then((data) => this.setState(data));
    getMyAllChatRooms().then((data) => this.setState(data));
  };
}

new ChatListPage();
