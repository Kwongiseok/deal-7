import UserSlide from "./UserSlide/UserSlide.js";

function MainPage(params) {
  this.state = {
    name: "종호",
  };
  this.$main = document.querySelector("#mainPage");

  const userSlide = new UserSlide({
    $main: this.$main,
    onHandler: () => {
      this.setState({ ...this.state, name: "기석" });
    },
    initialState: this.state.name,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    userSlide.setState({ name: this.state.name });
  };
}

new MainPage();
