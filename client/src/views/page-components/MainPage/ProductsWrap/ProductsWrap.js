import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import Product from '../../../components/Product/Product.js';

export default function ProductsWrap({ $selector, products }) {
  this.$ProductsWrap = createDOMwithSelector('div', '.products-wrap');
  this.$selector = $selector;
  this.$selector.appendChild(this.$ProductsWrap);

  this.products = products;

  this.render = () => {
    this.products.map((productInfo) => {
      new Product({ $selector: this.$ProductsWrap, infos: productInfo });
    });
  };

  this.render();
}
