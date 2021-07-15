import EMPTY_ERROR_MESSAGE from '../../../../constants/emptyErrorMessage.js';
import Product from '../../../components/Product/Product.js';
import Thung from '../../../components/Thung/Thung.js';

export default function LikeListScreen({ $selector, likeList }) {
  this.render = () => {
    if (likeList.length === 0) {
      return new Thung({
        $selector: document.querySelector('.menu-slide-main'),
        message: EMPTY_ERROR_MESSAGE['likeList'],
      });
    }

    return likeList.map((saleListInfo) => {
      new Product({
        $selector,
        infos: saleListInfo,
      });
    });
  };

  this.render();
}
