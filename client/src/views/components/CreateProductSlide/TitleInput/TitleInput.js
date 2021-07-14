export default function TitleInput({ $target, onInputHandler, initialState }) {
  this.state = initialState;

  this.$titleInput = document.createElement('input');
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
  };

  this.render();
}
