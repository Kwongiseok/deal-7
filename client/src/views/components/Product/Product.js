import { FILLED_HEART_ICON, HEART_ICON, MESSAGE_ICON } from '../../../constants/imagePath.js';
import { SAMPLE_THUMBNAIL } from '../../../dummy-file.js';
import { createDOMwithSelector } from '../../../utils/createDOMwithSelector.js';

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
}) {
  this.$Product = createDOMwithSelector('div', '.product');
  $selector.appendChild(this.$Product);

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
        ${createHeartIcon(isLiked)}
        <div class="product__reaction-wrap">
            ${createLikeWrapper(like)}
            ${createMessageWrapper(message)}
        </div>
    `;
  };

  this.render();
}

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
