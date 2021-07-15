import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import Carousel from './Carousel/Carousel.js';
import ProductDetailBody from './ProductDetailBody/ProductDetailBody.js';
import ProductDetailFooter from './ProductDetailFooter/ProductDetailFooter.js';
import ProductDetailHeader from './ProductDetailHeader/ProductDetailHeader.js';
import ProductStateSelector from './ProductStateSelector/ProductStateSelector.js';
import SelectModal from './SelectModal/SelectModal.js';
import SelectStateModal from './SelectStateModal/SelectStateModal.js';

export default function ProductDetail({ $target, onSlideHandler }) {
  this.state = {
    images: [],
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
  this.onSlideHandler = onSlideHandler;

  this.$productDetail = createDOMwithSelector('div', '.productDetail');

  $target.appendChild(this.$productDetail);

  const selectOptionModal = new SelectModal({
    $target: this.$productDetail,
    onClickEditHandler: () => {
      this.onSlideHandler();
    },
    onClickDeleteHandler: () => {
      console.log('삭제 모달');
    },
  });

  const selectStateModal = new SelectStateModal({
    $target: this.$productDetail,
    onChangeStateHandler: (productState) => {
      this.setState({ ...this.state, state: productState });
    },
    initialState: {
      state: this.state.state,
    },
  });

  const productDetailHeader = new ProductDetailHeader({
    $target: this.$productDetail,
    onClickOptionHandler: () => {
      selectOptionModal.showModal();
    },
    initialState: { isSeller: this.state.isSeller },
  });

  new Carousel({ $target: this.$productDetail });

  const productStateSelector = new ProductStateSelector({
    $target: this.$productDetail,
    onClickSelectorHandler: () => {
      selectStateModal.showModal();
    },
    initialState: {
      isSeller: this.state.isSeller,
      state: this.state.state,
    },
  });

  new ProductDetailBody({ $target: this.$productDetail, initialState: this.state });

  const productDetailFooter = new ProductDetailFooter({
    $target: this.$productDetail,
    initialState: {
      price: this.state.price,
      isLiked: this.state.isLiked,
      isSeller: this.state.isSeller,
      chatCounts: this.state.chatCounts,
    },
    onClickFullHeartHandler: (e) => {
      this.setState({ ...this.state, isLiked: !this.state.isLiked });
    },
    onClickEmptyHeartHandler: (e) => {
      this.setState({ ...this.state, isLiked: !this.state.isLiked });
    },
  });

  this.$productDetail.addEventListener('click', (e) => {
    if (!e.target.closest('[data-link=more]')) {
      selectOptionModal.hideModal();
    }
    if (!e.target.closest('.productStateSelector')) {
      selectStateModal.hideModal();
    }
  });

  this.setState = (nextState) => {
    this.state = nextState;
    productDetailFooter.setState({
      price: this.state.price,
      isLiked: this.state.isLiked,
      isSeller: this.state.isSeller,
      chatCounts: this.state.chatCounts,
    });
    productStateSelector.setState({
      ...productStateSelector.state,
      state: this.state.state,
    });
  };
}
