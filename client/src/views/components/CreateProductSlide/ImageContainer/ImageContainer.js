import ImageUploader from './ImageUploader/ImageUploader.js';

export default function ImageContainer({ $target, onImageUploadHandler, onDeleteImageHandler, initialState }) {
  this.state = initialState;
  this.onImageUploadHandler = onImageUploadHandler;
  this.onDeleteImageHandler = onDeleteImageHandler;
  this.$imageContainer = document.createElement('div');

  this.$imageUploader = new ImageUploader({
    $target: this.$imageContainer,
    onImageUploadHandler: this.onImageUploadHandler,
    counts: this.state.counts,
  });

  $target.appendChild(this.$imageContainer);

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;
    this.$imageUploader.setState({ counts: this.state.counts });
    this.render();
  };

  this.render = () => {};
}
