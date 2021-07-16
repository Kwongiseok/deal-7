import EMPTY_ERROR_MESSAGE from '../../../../constants/emptyErrorMessage.js';
import Product from '../../../components/Product/Product.js';
import Thung from '../../../components/Thung/Thung.js';

export default function SaleListScreen({ $selector, saleList }) {
  // state
  this.state = {
    currentlyOpenedModalNumber: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // event

  /**
   * 사용자가 dropdown 아이콘을 누르면
   * target.dataset.value에 modal number 값을 얻을 수 있습니다.
   * 만약, 다른 곳을 누른다면 undefined를 넣어줍니다.
   */
  const bindEvents = () => {
    document.addEventListener('click', ({ target }) => {
      changeOpenedModalNumber(target.dataset.value);
    });
  };

  /**
   * nextNumber가 undefined 라면, null로 수정해줍니다.
   * 이후, 이전 열려있는 모달이 있는지 확인하고 열려있으면 닫아줍니다.
   * 그리고 새로운 Modal을 열어줍니다.
   */
  const changeOpenedModalNumber = (nextNumber) => {
    if (!nextNumber) nextNumber = null;
    this.closeModal(this.state.currentlyOpenedModalNumber);
    this.showModal(nextNumber);

    this.setState({ currentlyOpenedModalNumber: nextNumber });
  };

  this.closeModal = (beforeModalNumber) => {
    if (beforeModalNumber === null) return;
    const beforeOpenedModal = document.querySelector(`[data-modal-number='${beforeModalNumber}']`);
    beforeOpenedModal.classList.remove('opened');
  };

  this.showModal = (nextModalNumber) => {
    if (nextModalNumber === null) return;
    const nextOpenedModal = document.querySelector(`[data-modal-number='${nextModalNumber}']`);
    nextOpenedModal.classList.add('opened');
  };

  this.render = () => {
    if (saleList.length === 0) {
      return new Thung({
        $selector: document.querySelector('.menu-slide-main'),
        message: EMPTY_ERROR_MESSAGE['saleList'],
      });
    }

    return saleList.map((saleListInfo, idx) => {
      new Product({
        $selector,
        infos: saleListInfo,
        isAdminMode: true,
        isModifyModalOpen: idx.toString() === this.state.currentlyOpenedModalNumber,
        idx,
      });
    });
  };

  this.render();
  bindEvents();
}
