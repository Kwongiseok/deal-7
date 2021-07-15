import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import Carousel from './Carousel/Carousel.js';
import DeleteConfirmModal from './DeleteConfirmModal/DeleteConfirmModal.js';
import ProductDetailBody from './ProductDetailBody/ProductDetailBody.js';
import ProductDetailFooter from './ProductDetailFooter/ProductDetailFooter.js';
import ProductDetailHeader from './ProductDetailHeader/ProductDetailHeader.js';
import ProductStateSelector from './ProductStateSelector/ProductStateSelector.js';
import SelectModal from './SelectModal/SelectModal.js';
import SelectStateModal from './SelectStateModal/SelectStateModal.js';

export default function ProductDetail({ $target, onSlideHandler, initialState }) {
  /**
   *
   * this.state = {
   *  images: 이미지의 URL 배열,
   *  price: 상품의 가격,
   *  state: 상품의 상태 : '판매중',
   *  title: 상품 제목,
   *  category: 카테고리 분류,
   *  time: 게시물 작성되고 지난 시간,
   *  content: 게시물의 내용
   *  chatCounts: 열려있는 채팅방 수,
   *  likeCounts: 좋아요 수,
   *  viewCounts: 조회 수,
   *  seller: 판매자,
   *  town: 지역,
   *  isSeller: 판매자인지 구분,
   *  isLiked: 좋아요했는 지 구분,
   * };
   */

  this.state = initialState;
  this.onSlideHandler = onSlideHandler;

  this.$productDetail = createDOMwithSelector('div', '.productDetail');

  $target.appendChild(this.$productDetail);

  const deleteConfirmModal = new DeleteConfirmModal({
    $target,
    onDeleteHandler: () => {
      console.log('삭제 API 연결');
    },
  });

  const selectOptionModal = new SelectModal({
    $target: this.$productDetail,
    onClickEditHandler: () => {
      this.onSlideHandler();
    },
    onClickDeleteHandler: () => {
      deleteConfirmModal.showModal();
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

  new Carousel({ $target: this.$productDetail, imageUrls: this.state.imageUrls });

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
