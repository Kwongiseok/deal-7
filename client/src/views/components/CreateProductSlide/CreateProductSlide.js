import CategoryList from './CategoryList/CategoryList.js';
import ContentInput from './ContentInput/ContentInput.js';
import CreateProductFooter from './CreateProductFooter/CreateProductFooter.js';
import CreateProductHeader from './Header/CreateProductHeader.js';
import ImageContainer from './ImageContainer/ImageContainer.js';
import PriceInput from './PriceInput/PriceInput.js';
import TitleInput from './TitleInput/TitleInput.js';

export default function CreateProductSlide({ $target, town }) {
  this.state = {
    imageFiles: [],
    imageUrls: [],
    title: '',
    category: '',
    price: '',
    content: '',
    town: town,
  };

  this.$createProductSlide = document.createElement('div');
  $target.appendChild(this.$createProductSlide);

  this.$createProductSlide.className = 'createProductSlide';

  const createProductHeader = new CreateProductHeader({
    $target: this.$createProductSlide,
    onSubmit: (e) => console.log(this.state),
    initialState: { title: this.state.title, category: this.state.category, content: this.state.content },
  });

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

  const categoryList = new CategoryList({
    $target: this.$createProductSlide,
    onClickHandler: (category) => {
      this.setState({ ...this.state, category });
    },
    initialState: { title: this.state.title, category: this.state.category },
  });

  const priceInput = new PriceInput({
    $target: this.$createProductSlide,
    onInputHandler: (e) => {
      const value = e.target.value;
      this.setState({ ...this.state, price: value });
    },
    initialState: {
      price: this.state.price,
    },
  });

  const contentInput = new ContentInput({
    $target: this.$createProductSlide,
    onInputHandler: (e) => {
      const value = e.target.value;
      this.setState({ ...this.state, content: value });
    },
    initialState: {
      content: this.state.content,
    },
  });

  const createProductFooter = new CreateProductFooter({
    $target: this.$createProductSlide,
    town: this.state.town,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    createProductHeader.setState({
      title: this.state.title,
      category: this.state.category,
      content: this.state.content,
    });
    imageContainer.setState({ counts: this.state.imageUrls.length, imageUrls: this.state.imageUrls });
    titleInput.setState({ title: this.state.title });
    categoryList.setState({ title: this.state.title, category: this.state.category });
    priceInput.setState({ price: this.state.price });
    contentInput.setState({ content: this.state.content });
    this.render();
  };

  this.render = () => {};
}
