export default function TitleInput({ $target, onInputHandler, initialState }) {
  this.state = initialState;

  this.$titleInput = document.createElement('input');
  this.$titleInput.className = 'CreateProduct__title';
  this.$titleInput.required = true;
  this.$titleInput.placeholder = '글 제목';
  this.onInputHandler = onInputHandler;

  $target.appendChild(this.$titleInput);

  this.$titleInput.addEventListener('input', this.onInputHandler);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$titleInput.value = this.state.title;
    if (this.$titleInput.value.length > 0) {
      this.$titleInput.style.borderBottom = '0px';
    }
  };

  this.render();
}
