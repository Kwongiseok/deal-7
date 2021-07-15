export default function CarouselCount({ $target, initialState }) {
  /**
   * {
   *  total : 7,
   *  current : 1,
   * }
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
    this.$carouselCount.innerHTML = `<span class="carousel__counter">${this.state.current + 1} / ${
      this.state.total
    }</span>`;
  };

  this.render();
}
