export default function ProductDetailBody({ $target, initialState }) {
  this.state = initialState;
  this.$productDetailBody = document.createElement('div');
  $target.appendChild(this.$productDetailBody);

  this.render = () => {
    this.$productDetailBody.innerHTML = `
      <div class="productDetailBody__title__container">
        <h2>${this.state.title}</h2>
        <span>${this.state.category}</span>
        <span>${this.state.time}</span>
      </div>
      <div class="productDetailBody__content">
        ${this.state.content}
      </div>
      <div class="productDetailBody__info">
        <span>채팅 ${this.state.chatCounts}</span>
        <span>관심 ${this.state.likeCounts}</span>
        <span>조회 ${this.state.viewCounts}</span>
      </div>
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
