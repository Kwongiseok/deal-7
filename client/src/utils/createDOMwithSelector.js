export const createDOMwithSelector = (tag, selector) => {
  const DOM = document.createElement(tag);

  if (selector[0] === '#') {
    DOM.id = selector.slice(1);
    return DOM;
  }

  if (selector[0] === '.') {
    DOM.className = selector.slice(1);
    return DOM;
  }
};
