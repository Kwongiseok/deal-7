import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import ChatDetailPageBody from './ChatDetailPageBody/ChatDetailPageBody.js';
import ChatDetailPageFooter from './ChatDetailPageFooter/ChatDetailPageFooter.js';
import ChatDetailPageProduct from './ChatDetailPageProduct/ChatDetailPageProduct.js';
import ChatDetailPageHeader from './ChatDetaiPageHeader/ChatDetailPageHeader.js';

export default function ChatDetailPage() {
  this.state = {};
  const $target = document.querySelector('#root');

  this.$chatDetailPage = createDOMwithSelector('div', '.chatDetailPage');
  $target.appendChild(this.$chatDetailPage);

  new ChatDetailPageHeader({ $target: this.$chatDetailPage });

  new ChatDetailPageProduct({ $target: this.$chatDetailPage });

  new ChatDetailPageBody({ $target: this.$chatDetailPage });

  new ChatDetailPageFooter({ $target: this.$chatDetailPage });
}

new ChatDetailPage();
