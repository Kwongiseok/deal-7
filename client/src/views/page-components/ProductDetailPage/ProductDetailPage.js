import CreateProductSlide from '../../components/CreateProductSlide/CreateProductSlide.js';

function ProductDetailPage() {
  const town = '역삼동';
  this.$ProductDetailPage = document.querySelector('#product-detail-page');

  const createProductSlide = new CreateProductSlide({
    $target: this.$ProductDetailPage,
    onSubmitHandler: () => {},
    town,
  });
}

new ProductDetailPage();
