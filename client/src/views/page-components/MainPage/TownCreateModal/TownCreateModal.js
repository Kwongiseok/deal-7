import { CLOSE_BUTTON, OK_BUTTON } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import BaeminInputField from '../../../components/BaeminInputField/BaeminInputField.js';

export default function TownCreateModal({ $selector, addUserTownState }) {
  this.$TownCreateModal = createDOMwithSelector('aside', '.town-create-modal');
  $selector.appendChild(this.$TownCreateModal);

  //state
  this.state = {
    locationInputValue: '',
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  //events
  const bindEvents = () => {
    document.querySelector('.town-create-modal__screen').addEventListener('click', (e) => {
      e.stopPropagation();

      if (e.target.closest('.town-create-modal__interact-buttons--close')) {
        document.querySelector('.town-create-modal').classList.remove('visible');
      }

      if (e.target.closest('.town-create-modal__interact-buttons--submit')) {
        addUserTownState(this.state.locationInputValue);
        document.querySelector('.town-create-modal').classList.remove('visible');
      }
    });
  };

  //render
  this.render = () => {
    this.$TownCreateModal.innerHTML = `
        <div class='town-create-modal__screen'>
            <div class='town-create-modal__input-field'></div>
            <div class='town-create-modal__interact-buttons'>
                <img src=${CLOSE_BUTTON} class='town-create-modal__interact-buttons--close'>
                <img src=${OK_BUTTON} class='town-create-modal__interact-buttons--submit'>
            </div>
        </div>
    `;

    new BaeminInputField({
      $selector: document.querySelector('.town-create-modal__input-field'),
      type: 'text',
      label: '현재 위치를 \n입력하세요.',
      placeholder: '시, 구 제외. 동만 입력',
      errorMessage: '',
      onChange: (val) => this.setState({ locationInputValue: val }),
    });
  };

  this.render();
  bindEvents();
}
