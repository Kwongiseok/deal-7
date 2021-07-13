import ImageContainer from './ImageContainer/ImageContainer.js';

export default function CreateProductSlide({ $target, onSubmitHandler, town }) {
  this.state = {
    imageFiles: [],
    imageUrls: [],
    title: null,
    category: null,
    price: null,
    content: null,
    town: town,
  };

  this.$createProductSlide = document.createElement('div');
  $target.appendChild(this.$createProductSlide);
  this.$createProductSlide.classList.add('createProductSlide');

  const imageContainer = new ImageContainer({
    $target: this.$createProductSlide,
    onImageUploadHandler: (addUrls, addFiles) => {
      this.setState({
        ...this.state,
        imageUrls: [...this.state.imageUrls, addUrls],
        imageFiles: [...this.state.imageFiles, addFiles],
      });
    },
    onDeleteImageHandler: (name) => {
      const updatedFiles = { ...this.state.imageFiles };
      const updatedUrls = { ...this.state.imageUrls };
      delete updatedFiles[name];
      delete updatedUrls[name];
      this.setState({ ...this.state, imageFiles: updatedFiles, imageUrls: updatedUrls });
    },
    initialState: {
      counts: this.state.imageUrls.length,
      imageUrls: this.state.imageUrls,
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    imageContainer.setState({ counts: this.state.imageUrls.length, imageUrls: this.state.imageUrls });

    this.render();
  };

  this.render = () => {};
}
