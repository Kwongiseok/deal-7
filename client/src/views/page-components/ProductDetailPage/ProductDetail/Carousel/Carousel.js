export default function Carousel({ $target }) {
  this.$carousel = document.createElement('div');
  this.$carousel.className = 'carousel__container';
  this.$carousel.innerHTML = `<img class="carousel__img" src="https://i.pinimg.com/564x/d7/ec/75/d7ec75c9e68873ee75b734ac4ab09ced.jpg"/>`;
  $target.appendChild(this.$carousel);
}
