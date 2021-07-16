import { createDOMwithSelector } from '../../../../utils/createDOMwithSelector';

export default function ChatDetailPageHeader({ $target }) {
  this.$header = createDOMwithSelector('div', '.chatDetailPageHeader');

  $target.appendChild(this.$header);
}
