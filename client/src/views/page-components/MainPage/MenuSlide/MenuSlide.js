import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector.js';

export default function MenuSlide({ $selector }) {
  this.$MenuSlide = createDOMwithSelector('div', '.menu-slide');
  $selector.appendChild(this.$MenuSlide);

  this.openMenuSlide = (currentlyOpenedSlide) => {
    if (currentlyOpenedSlide !== 'menu') {
      return this.$MenuSlide.classList.remove('slide-trigerred');
    }

    return this.$MenuSlide.classList.add('slide-trigerred');
  };

  //state
  /**
   * currentlyMenuSlideItem
   * - 현재 MenuSlideItem이 보여주고 있는 값입니다.
   * - 들어 올 수 있는 값은 'saleList' | 'chatList' | 'likeList' 입니다.
   */
  this.state = {
    currentlyMenuSlideItem: 'saleList',
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  //Events
  const bindEvents = () => {
    document.addEventListener('click', ({ target }) => {
      changeMenuSlideItemState(target);
    });
  };

  /**
   * 메뉴 아이템을 클릭할 때마다,
   * 형식을 변경하고 (e.g. sale-list => saleList)
   * 상태를 변경합니다.
   */
  const changeMenuSlideItemState = (target) => {
    if (!target.dataset.menuSlideItem) return;

    const [data, attribute] = target.dataset.menuSlideItem.split('-');
    const convertedItem = `${data}${attribute[0].toUpperCase()}${attribute.slice(1)}`;

    this.setState({ currentlyMenuSlideItem: `${convertedItem}` });
  };

  //render
  this.render = () => {
    this.$MenuSlide.innerHTML = `
      ${getMenuSlideTitleDOM(this.state.currentlyMenuSlideItem)}
    `;
  };

  this.render();
  bindEvents();
}

const getMenuSlideTitleDOM = (currentlyMenuSlideItem) => {
  const DOM = {
    saleList: `
      <h2 class="menu-slide__title sale" data-menu-slide-item='sale-list'}>판매목록</h2>
      <h2 class="menu-slide__title chat not-choiced" data-menu-slide-item='chat-list'}>채팅</h2>
      <h2 class="menu-slide__title like not-choiced" data-menu-slide-item='like-list'}>관심목록</h2>
    `,
    chatList: `
      <h2 class="menu-slide__title sale not-choiced" data-menu-slide-item='sale-list'}>판매목록</h2>
      <h2 class="menu-slide__title chat" data-menu-slide-item='chat-list'}>채팅</h2>
      <h2 class="menu-slide__title like not-choiced" data-menu-slide-item='like-list'}>관심목록</h2>
    `,
    likeList: `
      <h2 class="menu-slide__title sale not-choiced" data-menu-slide-item='sale-list'}>판매목록</h2>
      <h2 class="menu-slide__title chat not-choiced" data-menu-slide-item='chat-list'}>채팅</h2>
      <h2 class="menu-slide__title like" data-menu-slide-item='like-list'}>관심목록</h2>
    `,
  };

  return DOM[currentlyMenuSlideItem];
};
