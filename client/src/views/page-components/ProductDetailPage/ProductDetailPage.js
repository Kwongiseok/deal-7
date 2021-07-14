import CreateProductSlide from '../../components/CreateProductSlide/CreateProductSlide.js';

function ProductDetailPage() {
  const town = '역삼동';
  this.$ProductDetailPage = document.querySelector('#product-detail-page');

  new CreateProductSlide({
    $target: this.$ProductDetailPage,
    town,
  });
}

new ProductDetailPage();
