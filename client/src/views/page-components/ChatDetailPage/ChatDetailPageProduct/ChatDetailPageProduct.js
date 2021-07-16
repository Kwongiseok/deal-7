import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function ChatDetailPageProduct({ $target }) {
  this.$product = createDOMwithSelector('div', '.chatDetailPageProduct');

  this.$product.addEventListener('click', (e) => {
    location.href('/');
  });
  $target.appendChild(this.$product);

  this.render = () => {
    this.$product.innerHTML = `
        <div class="chatDetail__product__container">
          <div class="chatDetail__image__container">
            <img
              class="chatDetail__product__image"
              src="https://i.pinimg.com/564x/d7/ec/75/d7ec75c9e68873ee75b734ac4ab09ced.jpg"
            />
          </div>
          <div class="chatDetail__product__info">
            <span class="chatDetail__product__name">빈티지 롤러 스케이트</span>
            <span class="chatDetail__product__price">160,000원</span>
          </div>
        </div>
        <button class="chatDetail__state">판매중</button>
      </>`;
  };

  this.render();
}
