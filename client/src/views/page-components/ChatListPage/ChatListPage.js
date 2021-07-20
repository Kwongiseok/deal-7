import { getChatRoomsAboutProduct, getMyAllChatRooms } from '../../../apis/chatAPI.js';
import { checkUserLoginStatus } from '../../../utils/checkUserLoginStatus.js';
import ChatRoomList from '../../components/ChatRoomList/ChatRoomList.js';
import ChatListPageHeader from './ChatListPageHeader/ChatListPageHeader.js';
import '../../../index.css';

export default function ChatListPage() {
  checkUserLoginStatus.then(({ isLoggedIn, res }) => {
    if (!isLoggedIn) return; // 메인 URL 추가할 예정
    this.setUserState({
      isLoggedIn: true,
      user: {
        accessToken: res.token.accessToken,
      },
    });
    getChatRoomsAboutProduct(1234, res.token.accessToken).then((data) => {
      if (data) {
        this.setState(data);
      }
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
}

new ChatListPage();
