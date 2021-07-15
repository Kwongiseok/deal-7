import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';
import CarouselCount from './CarouselCount/CarouselCount.js';

export default function Carousel({ $target, imageUrls }) {
  // this.images = [
  //   'https://i.pinimg.com/564x/d7/ec/75/d7ec75c9e68873ee75b734ac4ab09ced.jpg',
  //   'https://i.pinimg.com/474x/30/5a/21/305a216481dfaaec10fd59cf1f667652.jpg',
  //   'https://i.pinimg.com/474x/5f/a2/8e/5fa28eae2bdebd6ab2d30690304927b9.jpg',
  //   'https://i.pinimg.com/474x/a6/56/70/a65670944d4bf492a3a71c4a95bb3910.jpg',
  //   'https://i.pinimg.com/474x/e8/58/f3/e858f330363c0fb4240ca8cad087f74d.jpg',
  //   'https://i.pinimg.com/474x/c5/eb/47/c5eb47f58dd27a764f88551151f54893.jpg',
  // ];
  this.images = imageUrls;

  this.$carousel = createDOMwithSelector('div', '.carousel__container');
  this.$slides = createDOMwithSelector('div', '.carousel__slides');

  this.slideArr = this.images.map((src) => {
    const $slide = createDOMwithSelector('img', '.carousel__img');
    $slide.src = src;
    return $slide;
  });

  this.slideArr.forEach((slide) => this.$slides.appendChild(slide));
  this.$carousel.appendChild(this.$slides);
  $target.appendChild(this.$carousel);

  // TODO 권기석 : 이미지 API 연동 후 프로퍼티 name 수정
  const carouselCounter = new CarouselCount({
    $target: this.$carousel,
    initialState: {
      total: this.images.length,
      current: 0,
    },
  });

  this.slide = (wrapper, items) => {
    let posX1 = 0;
    let posX2 = 0;
    let posInitial,
      posFinal,
      threshold = 100;
    let slidesLength = this.images.length;
    let firstSlide = this.slideArr[0];
    let lastSlide = this.slideArr[this.slideArr.length - 1];
    let slideSize = this.slideArr[0].offsetWidth;
    let cloneFirst = firstSlide.cloneNode(true);
    let cloneLast = lastSlide.cloneNode(true);
    let index = 0;
    let allowShift = true;

    items.appendChild(cloneFirst);
    this.$slides.insertBefore(cloneLast, firstSlide);

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchmove', dragAction);
    items.addEventListener('touchend', dragEnd);

    items.onmousedown = dragStart;

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;

      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    }

    function dragAction(e) {
      e = e || window.event;

      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      items.style.left = items.offsetLeft - posX2 + 'px';
    }

    function dragEnd(e) {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
      } else {
        items.style.left = posInitial + 'px';
      }

      document.onmouseup = null;
      document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
      items.classList.add('shifting');

      if (allowShift) {
        if (!action) {
          posInitial = items.offsetLeft;
        }

        if (dir == 1) {
          items.style.left = posInitial - slideSize + 'px';
          index++;
        } else if (dir == -1) {
          items.style.left = posInitial + slideSize + 'px';
          index--;
        }
      }

      allowShift = false;
    }

    function checkIndex() {
      items.classList.remove('shifting');

      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + 'px';
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + 'px';
        index = 0;
      }
      carouselCounter.setState({ ...carouselCounter.state, current: index });

      allowShift = true;
    }
  };

  this.slide(this.$carousel, this.$slides);
}
