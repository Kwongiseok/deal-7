import CreateProductSlide from '../../components/CreateProductSlide/CreateProductSlide.js';
import ProductDetail from './ProductDetail/ProductDetail.js';

function ProductDetailPage() {
  const town = '역삼동';
  this.$ProductDetailPage = document.querySelector('#root');

  const createProductSlide = new CreateProductSlide({
    $target: this.$ProductDetailPage,
    town,
  });

  const productDetail = new ProductDetail({
    $target: this.$ProductDetailPage,
    onSlideHandler: () => {
      createProductSlide.slide();
    },
  });
}

new ProductDetailPage();
