import { DROPDOWN_ICON, FILLED_HEART_ICON, HEART_ICON, MESSAGE_ICON } from '../../../constants/imagePath.js';
import { SAMPLE_THUMBNAIL } from '../../../dummy-file.js';
import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';
import ProductModifyModal from '../../page-components/MainPage/ProductModifyModal/ProductModifyModal.js';

export default function Product({
  $selector,
  infos: {
    title,
    town,
    elapsedTime,
    price,
    reaction: { like, message },
    isLiked,
  },
  isAdminMode = false,
  idx,
}) {
  this.$Product = createDOMwithSelector('div', '.product');
  $selector.appendChild(this.$Product);

  //render
  this.render = () => {
    this.$Product.innerHTML = `
        <div class="product__thumbnail">
            <img class="product__thumbnail-img" src=${SAMPLE_THUMBNAIL}>
        </div>
        <div class="product__content">
            <span class="product__content__title">${title}</span>
            <div class="product__content__sub-info">
                <span class="product__content__town">${town}</span>
                <span class="delimiter"></span>
                <span class="product__elapsed-time">${elapsedTime}</span>
            </div>
            <span class="product__price">${price}</span>
        </div>
        ${checkIsAdminMode(isAdminMode, { isLiked, idx })}
        <div class="product__reaction-wrap">
            ${createLikeWrapper(like)}
            ${createMessageWrapper(message)}
        </div>   
    `;

    if (isAdminMode) {
      new ProductModifyModal({ $selector: this.$Product, idx });
    }
  };

  this.render();
  // bindEvents();
}

/**
 * AdminMode는 판매목록일 경우,
 * 사용자가 게시물을 수정 및 삭제 할 수 있는 권한입니다.
 * isAdmin 이 true일 경우 dropdown을 보여주고,
 * false일 경우 heart를 보여줍니다.
 */
const checkIsAdminMode = (isAdmin, { isLiked = false, idx }) => {
  if (isAdmin) return createDropdownIcon(idx);
  if (!isAdmin) return createHeartIcon(isLiked);
};

const createDropdownIcon = (idx) => {
  return `<img class="product__dropdown-icon" src=${DROPDOWN_ICON} data-value=${idx}>`;
};

const createHeartIcon = (isLiked) => {
  if (isLiked) return `<img class="product__user-like-icon" src=${FILLED_HEART_ICON}>`;
  if (!isLiked) return `<img class="product__user-like-icon" src=${HEART_ICON}>`;
};

/**
 * like의 개수가 0 또는 Undefined일 경우, DOM을 반환하지 않습니다.
 * createMessageWrapper도 같습니다.
 */
const createLikeWrapper = (like) => {
  if (!like) return '';
  return `
        <div class="product__reaction-wrap__like">
            <img src=${HEART_ICON}>
            <span>${like}</span>
        </div>
    `;
};

const createMessageWrapper = (message) => {
  if (!message) return '';
  return `
        <div class="product__reaction-wrap__like">
            <img src=${MESSAGE_ICON}>
            <span>${message}</span>
        </div>
    `;
};
