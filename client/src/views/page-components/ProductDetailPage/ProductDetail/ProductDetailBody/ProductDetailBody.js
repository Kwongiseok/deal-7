import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function ProductDetailBody({ $target, initialState }) {
  this.state = initialState;
  this.$productDetailBody = createDOMwithSelector('div', '.productDetailBody');
  $target.appendChild(this.$productDetailBody);

  this.render = () => {
    this.$productDetailBody.innerHTML = `
      <div class="productDetailBody__title__container">
        <h2 class="productDetailBody__title">${this.state.title}</h2>
        <ul class="productDetailBdoy__subInfo">
          <li class="subInfo__title">${this.state.category}</li>
          <li class="subInfo__title">${this.state.time}</li>
        </ul>
      </div>
      <div class="productDetailBody__content">
        ${this.state.content}
      </div>
      <ul class="productDetailBody__info">
        <li class="productDetailBody__info_subtitle">채팅 ${this.state.chatCounts}</li>
        <li class="productDetailBody__info_subtitle">관심 ${this.state.likeCounts}</li>
        <li class="productDetailBody__info_subtitle">조회 ${this.state.viewCounts}</li>
      </ul>
      <div class="productDetailBody__sellerInfo">
        <div class="sellerInfo__title__container">
          <span class="sellerInfo__title">판매자 정보</span>
        </div>
        <div class="sellerInfo__name__container">
          <span class="sellerInfo__name">${this.state.seller}</span>
          <span class="sellerInfo__town">${this.state.town}</span>
        </div>
      </div>`;
  };

  this.render();
}
