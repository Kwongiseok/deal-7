import CreateProductSlide from '../../components/CreateProductSlide/CreateProductSlide.js';
import ProductDetail from './ProductDetail/ProductDetail.js';

function ProductDetailPage() {
  const town = '역삼동';
  this.$ProductDetailPage = document.querySelector('#product-detail-page');

  const productDetailPage = new ProductDetail({ $target: this.$ProductDetailPage });

  // const createProductSlide = new CreateProductSlide({
  //   $target: this.$ProductDetailPage,
  //   town,
  // });
  // new CreateProductSlide({
  //   $target: this.$ProductDetailPage,
  //   town,
  // });
}

new ProductDetailPage();
