import { DELETE_PHOTO_ICON } from '../../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../../utils/createDOMwithSelector.js';

export default function ImageCardList({ $target, onDeleteImageHandler, imageUrls }) {
  this.state = {
    imageUrls,
  };
  this.onDeleteImageHandler = onDeleteImageHandler;
  this.$imageCardList = createDOMwithSelector('ul', '.imageCardList');

  $target.appendChild(this.$imageCardList);

  this.$imageCardList.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('button');
    deleteButton && onDeleteImageHandler(deleteButton.dataset.index);
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const HTML = this.state.imageUrls
      .map((url, index) => {
        return `<li class="imageCard">
        <img class="imageCard_image" src=${url} />
        <button class="imageCard_delete_button" data-index=${index}>
          <img class="button_icon" src="${DELETE_PHOTO_ICON}"/>
        </button>
      </li>`;
      })
      .join('');
    this.$imageCardList.innerHTML = HTML;
  };

  this.render();
}
