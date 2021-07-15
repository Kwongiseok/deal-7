import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function TownModal({ $selector, setTownModalOpenedState, setCurrentlyOpenedSlide }) {
  this.$TownModal = createDOMwithSelector('aside', '.town-modal');
  $selector.appendChild(this.$TownModal);

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

    // TODO: Change town state on Main Page
  });

  this.render = () => {
    this.$TownModal.innerHTML = `
            <div class='town-modal__item'>
                <span>역삼동</span>
            </div>
            <div class='town-modal__item' data-slide-item="town">
                <span>내 동네 설정하기</span>
            </div>
        `;
  };

  this.render();
}
