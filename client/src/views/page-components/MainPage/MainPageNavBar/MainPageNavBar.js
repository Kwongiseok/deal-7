import { CATEGORY_ICON, LOCATION_ICON, MENU_ICON, USER_ICON } from '../../../../constants/imagePath.js';

export default function MainPageNavBar({ $selector, onItemClick }) {
  this.$selector = $selector;

  this.render = () => {
    this.$selector.innerHTML = `
        <nav class="nav">
            <img class="category-img" src=${CATEGORY_ICON}>
            <img class="user-img" src=${USER_ICON}>
            <img class="menu-img" src=${MENU_ICON}>
            <div class="location-wrap">
                <img class="location-wrap__img" src=${LOCATION_ICON}>
                <span class="location-wrap__title">역삼동</span>
            </div>
        </nav>
    `;
  };

  this.render();
}
