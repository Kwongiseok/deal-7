import ChatListPageHeader from './ChatListPageHeader/ChatListPageHeader.js';
import ChatRoomList from './ChatRoomList/ChatRoomList.js';

export default function ChatListPage() {
  this.$chatListPage = document.querySelector('#root');

  new ChatListPageHeader({ $target: this.$chatListPage });

  new ChatRoomList({ $target: this.$chatListPage });
}

new ChatListPage();
