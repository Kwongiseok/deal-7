import Carousel from './Carousel/Carousel.js';
import ProductDetailBody from './ProductDetailBody/ProductDetailBody.js';

export default function ProductDetail({ $target }) {
  this.state = {
    images: [],
    state: '판매중',
    title: '빈티지 롤러 스케이트',
    category: '기타 중고물품',
    time: '3분 전',
    content:
      '어린시절 추억의 향수를 불러 일으키는 롤러스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고 되었습니다. 새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235 입니다.',
    chatCounts: '0',
    likeCounts: '2',
    viewCounts: '4',
    seller: '권기석',
    town: '역삼동',
  };
  this.$productDetail = document.createElement('div');

  $target.appendChild(this.$productDetail);
  const carousel = new Carousel({ $target: this.$productDetail });
  const productDetailBody = new ProductDetailBody({ $target: this.$productDetail, initialState: this.state });
}