export default function CarouselCount({ $target, initialState }) {
  /**
   * state가 가지는 값은 다음과 같습니다.
   * - total : Carousel이 가지고 있는 총 사진의 개수입니다.
   * - current : 현재 Carousel이 보여주고 있는 index 입니다.
   */
  this.state = initialState;

  this.$carouselCount = document.createElement('div');
  this.$carouselCount.className = 'carousel__counter__container';
  $target.appendChild(this.$carouselCount);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { current, total } = this.state;
    this.$carouselCount.innerHTML = `
      <span class="carousel__counter">${getCarouselIndex(current, total)} </span>`;
  };

  const getCarouselIndex = (idx, total) => {
    return `${idx + 1} / ${total}`;
  };

  this.render();
}
