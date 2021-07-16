import { CHECK_ICON, LEFT_ICON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function CreateProductHeader({ $target, onSubmit, onClose, initialState }) {
  this.state = initialState;
  this.onSubmit = onSubmit;

  this.$header = createDOMwithSelector('div', '.CreateProduct__header');
  this.$header__title = createDOMwithSelector('span', '.CreateProduct__header__title');
  this.$header__title.innerText = '글쓰기';

  this.$backButton = createDOMwithSelector('img', '.CreateProduct__header__back');
  this.$backButton.src = LEFT_ICON;
  this.$backButton.onclick = onClose;

  this.$checkButton = createDOMwithSelector('img', '.CreateProduct__header__check');
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
