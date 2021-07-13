import { IMAGE_DELETE_BUTTON } from '../../../../../../constants/imagePath.js';

export default function ImageCard({ $target, imageUrl, fileName }) {
  this.$imageCard = document.createElement('div');
  this.$image = document.createElement('img');
  this.$image.src = imageUrl;
  this.$closeButton = document.createElement('button');
  this.$closeButton.dataset.name = fileName;
  this.$icon = document.createElement('img');
  this.$icon.src = IMAGE_DELETE_BUTTON;

  $target.appendChild(this.$imageCard);
  this.$imageCard.appendChild(this.$image);
  this.$closeButton.appendChild(this.$icon);
  this.$imageCard.appendChild(this.$image);
}
