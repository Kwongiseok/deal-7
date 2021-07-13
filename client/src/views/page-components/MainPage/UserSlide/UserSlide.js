export default function UserSlide({ $main, onHandler, initialState }) {
  this.state = {
    name: initialState,
  };
  this.$UserSlide = document.createElement("div");
  this.onHandler = onHandler;

  $main.appendChild(this.$UserSlide);

  this.$UserSlide.addEventListener("click", this.onHandler);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$UserSlide.innerText = this.state.name;
  };
  this.render();
}
