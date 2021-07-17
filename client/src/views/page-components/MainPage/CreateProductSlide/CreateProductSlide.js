import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import CategoryList from '../../../components/CreateProductSlide/CategoryList/CategoryList.js';
import ContentInput from '../../../components/CreateProductSlide/ContentInput/ContentInput.js';
import CreateProductFooter from '../../../components/CreateProductSlide/CreateProductFooter/CreateProductFooter.js';
import CreateProductHeader from '../../../components/CreateProductSlide/Header/CreateProductHeader.js';
import ImageContainer from '../../../components/CreateProductSlide/ImageContainer/ImageContainer.js';
import PriceInput from '../../../components/CreateProductSlide/PriceInput/PriceInput.js';
import TitleInput from '../../../components/CreateProductSlide/TitleInput/TitleInput.js';

export default function CreateProductSlide({ $selector, setCurrentlyOpenedSlide }) {
  this.$CreateProductSlide = createDOMwithSelector('div', '.create-product-slide-wrap');
  $selector.appendChild(this.$CreateProductSlide);

  //state
  this.state = {
    title: '',
    category: '',
    price: '',
    content: '',
    town: '역삼동', // TODO: 추후에 상위 컴포넌트에서 현재 유저 town 받아오기
    imageUrls: [],
    imageFiles: [],
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };

    const { title, category, content, price } = this.state;

    $CreateProductHeader.setState({ title, category, content });

    $TitleInput.setState({ title });
    $CategoryList.setState({ title, category });
    $PriceInput.setState({ price });
    $ContentInput.setState({ content });
  };

  this.setImageState = (nextState) => {
    this.state = { ...this.state, ...nextState };

    const { imageUrls } = this.state;
    $ImageContainer.setState({ counts: imageUrls.length, imageUrls });
  };

  //event
  this.openSlide = () => this.$CreateProductSlide.classList.add('slide-trigerred');
  this.closeSlide = () => this.$CreateProductSlide.classList.remove('slide-trigerred');
  this.openCreateProductSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'create') return this.closeSlide();
    this.openSlide();
  };

  this.setForm = () => {
    const formData = new FormData();
    const uploadFiles = this.state.imageFiles;
    uploadFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('title', this.state.title);
    formData.append('category', this.state.category);
    formData.append('price', this.state.price);
    formData.append('content', this.state.content);
    formData.append('town', this.state.town);
  };

  this.setImageInfoOnState = (addedUrls, addedFiles) => {
    this.setImageState({
      imageUrls: [...this.state.imageUrls, ...addedUrls],
      imageFiles: [...this.state.imageFiles, ...addedFiles],
    });
  };

  this.deleteImageInfoOnState = (idx) => {
    const updatedUrls = this.state.imageUrls.filter((item, i) => i !== parseInt(idx));
    const updatedFiles = this.state.imageFiles.filter((item, i) => i !== parseInt(idx));
    this.setImageState({ imageFiles: updatedFiles, imageUrls: updatedUrls });
  };

  this.setTitleState = (title) => this.setState({ title });
  this.setCategoryState = (category) => this.setState({ category });
  this.setPriceState = (price) => this.setState({ price });
  this.setContentState = (content) => this.setState({ content });

  //render
  const $CreateProductHeader = new CreateProductHeader({
    $target: this.$CreateProductSlide,
    initialState: { title: this.state.title, category: this.state.category, content: this.state.content },
    onSubmit: () => this.setForm(),
    onClose: () => setCurrentlyOpenedSlide(null),
  });

  const $ImageContainer = new ImageContainer({
    $target: this.$CreateProductSlide,
    initialState: {
      imageUrls: this.state.imageUrls,
      counts: this.state.imageUrls.length,
    },
    onImageUploadHandler: (addedUrls, addedFiles) => this.setImageInfoOnState(addedUrls, addedFiles),
    onDeleteImageHandler: (imageIdx) => this.deleteImageInfoOnState(imageIdx),
  });

  const $TitleInput = new TitleInput({
    $target: this.$CreateProductSlide,
    initialState: { title: this.state.title },
    onInputHandler: (e) => this.setTitleState(e.target.value),
  });

  const $CategoryList = new CategoryList({
    $target: this.$CreateProductSlide,
    initialState: { title: this.state.title, category: this.state.category },
    onClickHandler: (cat) => this.setCategoryState(cat),
  });

  const $PriceInput = new PriceInput({
    $target: this.$CreateProductSlide,
    initialState: { price: this.state.price },
    onInputHandler: (e) => this.setPriceState(e.target.value),
  });

  const $ContentInput = new ContentInput({
    $target: this.$CreateProductSlide,
    initialState: { content: this.state.content },
    onInputHandler: (e) => this.setContentState(e.target.value),
  });

  new CreateProductFooter({
    $target: this.$CreateProductSlide,
    town: this.state.town,
  });
}
