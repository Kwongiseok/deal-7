import ImageCardList from './ImageCardList/ImageCardList.js';
import ImageUploader from './ImageUploader/ImageUploader.js';

export default function ImageContainer({ $target, onImageUploadHandler, onDeleteImageHandler, initialState }) {
  this.state = initialState; // counts , imageUrls
  this.onImageUploadHandler = onImageUploadHandler;
  this.onDeleteImageHandler = onDeleteImageHandler;
  this.$imageContainer = document.createElement('div');
  this.$imageContainer.className = 'create-product-image-container';

  this.$imageUploader = new ImageUploader({
    $target: this.$imageContainer,
    onImageUploadHandler: this.onImageUploadHandler,
    counts: this.state.counts,
  });

  this.$imageCardList = new ImageCardList({
    $target: this.$imageContainer,
    onDeleteImageHandler,
    imageUrls: this.state.imageUrls,
  });

  $target.appendChild(this.$imageContainer);

  this.setState = (nextState) => {
    this.state = nextState;
    this.$imageUploader.setState({ counts: this.state.counts });
    this.$imageCardList.setState({ imageUrls: this.state.imageUrls });
    this.render();
  };

  this.render = () => {};

  this.render();
}
