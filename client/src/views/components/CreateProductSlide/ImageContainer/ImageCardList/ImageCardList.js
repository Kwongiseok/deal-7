import { IMAGE_DELETE_BUTTON } from '../../../../../constants/imagePath.js';

export default function ImageCardList({ $target, onDeleteImageHandler, imageUrls }) {
  this.state = {
    imageUrls,
  };
  this.$imageCardList = document.createElement('ul');
  this.$imageCardList.className = 'imageCardList';
  this.onDeleteImageHandler = onDeleteImageHandler;

  $target.appendChild(this.$imageCardList);
  this.$imageCardList.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('button');
    onDeleteImageHandler(deleteButton.dataset.index);
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const HTML = Object.keys(this.state.imageUrls)
      .map((index) => {
        const file = Object.entries(this.state.imageUrls[index]); // ['name', 'url']
        return `<li class="imageCard">
        <img class="imageCard_image" src=${file[0][1]} />
        <button class="imageCard_delete_button" data-index=${index}>
          <img class="button_icon" src="${IMAGE_DELETE_BUTTON}"/>
        </button>
      </li>`;
      })
      .join('');
    this.$imageCardList.innerHTML = HTML;
  };

  this.render();
}
