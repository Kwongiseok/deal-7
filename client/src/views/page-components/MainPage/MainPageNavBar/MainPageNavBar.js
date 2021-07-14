export default function MainPageNavBar({ $selector, onItemClick }) {
  this.$selector = $selector;

  this.render = () => {
    this.$selector.innerHTML = `
        <nav class="nav">
            <img class="category-img" src="../../public/images/icons/category.svg">
            <img class="user-img" src="../../public/images/icons/user.svg">
            <img class="menu-img" src="../../public/images/icons/menu.svg">
            <div class="location-wrap">
                <img class="location-wrap__img" src="../../public/images/icons/location.svg">
                <span class="location-wrap__title">역삼동</span>
            </div>
        </nav>
    `;
  };

  this.render();
}
