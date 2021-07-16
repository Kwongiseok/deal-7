import { CATEGORY_ICON, LOCATION_ICON, MENU_ICON, USER_ICON } from '../../../../constants/imagePath.js';

export default function MainPageNavBar({ $selector, currentTown }) {
  this.state = { currentTown };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $selector.innerHTML = `
        <nav class="nav">
            <img class="category-img" src=${CATEGORY_ICON} data-slide-item="category">
            <img class="user-img" src=${USER_ICON} data-slide-item="user">
            <img class="menu-img" src=${MENU_ICON} data-slide-item="menu">
            <div class="location-wrap" data-item="set-town">
                <img class="location-wrap__img" src=${LOCATION_ICON}>
                <span class="location-wrap__title">${this.state.currentTown}</span>
            </div>
        </nav>
    `;
  };

  this.render();
}
