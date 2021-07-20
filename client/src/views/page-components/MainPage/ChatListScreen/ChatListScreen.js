import EMPTY_ERROR_MESSAGE from '../../../../constants/emptyErrorMessage.js';
import ChatRoomList from '../../../components/ChatRoomList/ChatRoomList.js';
import Product from '../../../components/Product/Product.js';
import Thung from '../../../components/Thung/Thung.js';

export default function ChatListScreen({ $selector, chatList }) {
  this.render = () => {
    if (chatList.length === 0) {
      return new Thung({
        $selector: document.querySelector('.menu-slide-main'),
        message: EMPTY_ERROR_MESSAGE['chatList'],
      });
    } else {
      return new ChatRoomList({
        $target: $selector,
        initialState: chatList,
      });
    }

    //TODO: Chat 개발에 시작할 때, Chat component를 해당 스크린에서 렌더링 해야 합니다.
  };

  this.render();
}
