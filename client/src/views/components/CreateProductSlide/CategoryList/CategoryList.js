export default function CategoryList({ $target, onClickHandler }) {
  this.$categoryList = document.createElement('ul');
  this.onClickHandler = (e) => {
    e.target.closest('li').dataset.category;
    onClickHandler(category);
  };

  this.$categoryList.addEventListener('click', this.onClickHandler);
}
