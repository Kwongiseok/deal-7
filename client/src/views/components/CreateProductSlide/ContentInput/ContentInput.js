export default function ContentInput({ $target, onInputHandler, initialState }) {
  this.state = initialState; // { content : ''}
  this.onInputHandler = onInputHandler;
  this.$contentInput = document.createElement('textarea');
  this.$contentInput.className = 'CreateProduct__content';
  this.$contentInput.placeholder = '게시글 내용을 작성해주세요.';

  this.$contentInput.addEventListener('input', this.onInputHandler);

  $target.appendChild(this.$contentInput);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$contentInput.value = this.state.content;
  };

  this.render();
}
