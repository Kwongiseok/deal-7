import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function TownModal({ $selector, userTowns, setTownModalOpenedState, setCurrentlyOpenedSlide, setTown }) {
  this.$TownModal = createDOMwithSelector('aside', '.town-modal');
  $selector.appendChild(this.$TownModal);

  this.state = { userTowns };

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.showTownModal = (isTownModalOpened) => {
    if (!isTownModalOpened) {
      return this.$TownModal.classList.remove('opened');
    }
    return this.$TownModal.classList.add('opened');
  };

  this.$TownModal.addEventListener('click', (e) => {
    e.stopPropagation();

    if (e.target.closest('[data-slide-item=town]')) {
      setTownModalOpenedState('close');
      setCurrentlyOpenedSlide('town');
      return;
    }

    setTown({ town: e.target.innerText });
  });

  this.render = () => {
    this.$TownModal.innerHTML = `
      ${getTownModalItemDOM(this.state.userTowns)}
      <div class='town-modal__item' data-slide-item="town">
          <span>내 동네 설정하기</span>
      </div>
    `;
  };

  this.render();
}

const getTownModalItemDOM = (towns) => {
  return towns
    .reduce((acc, curr) => {
      const currDOM = `
      <div class='town-modal__item'>
          <span>${curr}</span>
      </div>
    `;
      acc.push(currDOM);
      return acc;
    }, [])
    .join('');
};
