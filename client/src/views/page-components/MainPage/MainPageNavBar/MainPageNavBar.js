import { CATEGORY_ICON, LOCATION_ICON, MENU_ICON, USER_ICON } from '../../../../constants/imagePath.js';

export default function MainPageNavBar({ $selector }) {
  this.$selector = $selector;

  this.render = () => {
    this.$selector.innerHTML = `
        <nav class="nav">
            <img class="category-img" src=${CATEGORY_ICON} data-slide-item="category">
            <img class="user-img" src=${USER_ICON} data-slide-item="user">
            <img class="menu-img" src=${MENU_ICON} data-slide-item="menu">
            <div class="location-wrap" data-slide-item="town">
                <img class="location-wrap__img" src=${LOCATION_ICON} data-slide-item="town">
                <span class="location-wrap__title" data-slide-item="town">역삼동</span>
            </div>
        </nav>
    `;
  };

  this.render();
}
