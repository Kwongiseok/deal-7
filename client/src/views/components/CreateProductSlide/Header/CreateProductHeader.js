import { CHECK_ICON, LEFT_ICON } from '../../../../constants/imagePath.js';

export default function CreateProductHeader({ $target, onSubmit, initialState }) {
  this.state = initialState;

  this.$header = document.createElement('div');
  this.$header.className = 'CreateProduct__header';
  this.$header__title = document.createElement('span');
  this.$header__title.innerText = '글쓰기';
  this.$backButton = document.createElement('img');
  this.$backButton.src = LEFT_ICON;

  this.onSubmit = onSubmit;
  this.$checkButton = document.createElement('img');
  this.$checkButton.className = 'CreateProduct__header__check';
  this.$checkButton.src = CHECK_ICON;

  $target.appendChild(this.$header);
  this.$header.appendChild(this.$backButton);
  this.$header.appendChild(this.$header__title);
  this.$header.appendChild(this.$checkButton);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (Object.values(this.state).every((item) => item)) {
      this.$checkButton.classList.add('checked');
      this.$checkButton.onclick = this.onSubmit;
    } else {
      this.$checkButton.classList.remove('checked');
      this.$checkButton.onclick = '';
    }
  };
  this.render();
}
