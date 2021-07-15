import { FILLED_HEART_ICON, HEART_ICON } from '../../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function ProductDetailFooter({
  $target,
  initialState,
  onClickEmptyHeartHandler,
  onClickFullHeartHandler,
  onClickButtonHandler,
}) {
  /**
   * this.state = {
   *  price : string,
   *  isLiked : boolean,
   *  isSeller : boolean,
   *  chatCounts : number,
   * }
   */
  this.state = initialState;
  this.onClickFullHeartHandler = onClickFullHeartHandler;
  this.onClickEmptyHeartHandler = onClickEmptyHeartHandler;
  this.onClickButtonHandler = onClickButtonHandler;

  this.$footer = createDOMwithSelector('div', '.productDetailFooter');
  this.$heart = createDOMwithSelector('img', '.productDetailFooter__heart');
  this.$footerRight = createDOMwithSelector('div', '.productDetailFooter__right__container');
  this.$price = createDOMwithSelector('div', '.productDetailFooter__price');
  this.$chatButton = createDOMwithSelector('button', '.productDetailFooter__chatButton');

  $target.appendChild(this.$footer);
  this.$footer.appendChild(this.$heart);
  this.$footer.appendChild(this.$footerRight);
  this.$footerRight.appendChild(this.$price);
  this.$footerRight.appendChild(this.$chatButton);

  this.$price.innerText = this.state.price || '가격미정';

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.renderHeart();
    this.renderChatButton();
  };

  this.renderHeart = () => {
    if (this.state.isLiked) {
      this.$heart.src = FILLED_HEART_ICON;
      this.$heart.onclick = this.onClickFullHeartHandler;
    } else {
      this.$heart.src = HEART_ICON;
      this.$heart.onclick = this.onClickEmptyHeartHandler;
    }
  };
  this.renderChatButton = () => {
    this.$chatButton.disabled = false;
    if (this.state.isSeller) {
      if (this.state.chatCounts > 0) {
        return (this.$chatButton.innerText = `채팅 목록 보기(${this.state.chatCounts})`);
      }
      this.$chatButton.disabled = true;
      return (this.$chatButton.innerText = `채팅 목록 보기`);
    } else {
      return (this.$chatButton.innerText = `문의하기`);
    }
  };

  this.render();
}
