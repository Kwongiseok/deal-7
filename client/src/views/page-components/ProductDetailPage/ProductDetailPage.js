import CreateProductSlide from '../../components/CreateProductSlide/CreateProductSlide.js';
import ProductDetail from './ProductDetail/ProductDetail.js';

function ProductDetailPage() {
  this.state = {
    imageUrls: [
      'https://i.pinimg.com/564x/d7/ec/75/d7ec75c9e68873ee75b734ac4ab09ced.jpg',
      'https://i.pinimg.com/474x/30/5a/21/305a216481dfaaec10fd59cf1f667652.jpg',
      'https://i.pinimg.com/474x/5f/a2/8e/5fa28eae2bdebd6ab2d30690304927b9.jpg',
      'https://i.pinimg.com/474x/a6/56/70/a65670944d4bf492a3a71c4a95bb3910.jpg',
      'https://i.pinimg.com/474x/e8/58/f3/e858f330363c0fb4240ca8cad087f74d.jpg',
      'https://i.pinimg.com/474x/c5/eb/47/c5eb47f58dd27a764f88551151f54893.jpg',
    ],
    price: '169,000원',
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
    isSeller: true,
    // isSeller: false,
    isLiked: true,
  };
  this.$ProductDetailPage = document.querySelector('#root');

  const createProductSlide = new CreateProductSlide({
    $target: this.$ProductDetailPage,
    initialState: {
      imageUrls: this.state.imageUrls,
      title: this.state.title,
      category: this.state.category,
      price: this.state.price,
      content: this.state.content,
      town: this.state.town,
    },
  });

  const productDetail = new ProductDetail({
    $target: this.$ProductDetailPage,
    onSlideHandler: () => {
      createProductSlide.slide();
    },
    initialState: this.state,
  });
}

new ProductDetailPage();
