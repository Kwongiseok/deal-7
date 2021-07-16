import { DISTRICT_NOTIFICATION } from '../../../../constants/imagePath.js';
import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';
import TownSlideButton from '../TownSlideButton/TownSlideButton.js';
import TownPlusButton from '../TownPlusButton/TownPlusButton.js';

export default function TownSlide({ $selector, currentTown, towns, setTownFilter, setUserTown }) {
  this.$TownSlide = createDOMwithSelector('div', '.town-slide');
  $selector.appendChild(this.$TownSlide);

  this.openTownSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'town') {
      return this.$TownSlide.classList.remove('slide-trigerred');
    }

    return this.$TownSlide.classList.add('slide-trigerred');
  };

  //state
  this.state = {
    currentTown,
    towns,
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
    bindEvents();
  };

  //events
  const bindEvents = () => {
    this.$TownSlide.addEventListener('click', ({ target }) => {
      if (target.classList.contains('town-slide-button')) {
        setTownFilter({ town: target.innerText.trim() });
      }
      if (target.dataset.eraseItem) {
        const eraseItem = target.dataset.eraseItem.split('-')[1];
        const erasedTowns = this.state.towns.filter((elem) => elem !== eraseItem);
        setUserTown({ town: erasedTowns, currentTownFilter: erasedTowns[0] });
      }
    });
  };

  //render
  this.render = () => {
    this.$TownSlide.innerHTML = `
      <h2 class="town-slide__title">내 동네 설정하기</h2>
      <div class="town-screen">
        <img src=${DISTRICT_NOTIFICATION} class="district__logo">
        <div class="town-screen__buttons"></div>
      </div>
    `;

    const $TownScreen = document.querySelector('.town-screen__buttons');
    this.state.towns.map((t) => {
      new TownSlideButton({ $selector: $TownScreen, townName: t, isChoiced: t === this.state.currentTown });
    });
    if (this.state.towns.length < 2) {
      new TownPlusButton({ $selector: $TownScreen });
    }
  };

  this.render();
  bindEvents();
}
