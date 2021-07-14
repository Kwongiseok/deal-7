import ImageContainer from './ImageContainer/ImageContainer.js';
import TitleInput from './TitleInput/TitleInput.js';

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
    onDeleteImageHandler: (index) => {
      const updatedFiles = [...this.state.imageFiles].filter((item, i) => index != i);
      const updatedUrls = [...this.state.imageUrls].filter((item, i) => index != i);
      this.setState({ ...this.state, imageFiles: updatedFiles, imageUrls: updatedUrls });
    },
    initialState: {
      counts: this.state.imageUrls.length,
      imageUrls: this.state.imageUrls,
    },
  });

  const titleInput = new TitleInput({
    $target: this.$createProductSlide,
    onInputHandler: (e) => {
      const value = e.target.value;
      this.setState({ ...this.state, title: value });
    },
    initialState: { title: this.state.title },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    imageContainer.setState({ counts: this.state.imageUrls.length, imageUrls: this.state.imageUrls });
    titleInput.setState({ title: this.state.title });
    this.render();
  };

  this.render = () => {};
}
