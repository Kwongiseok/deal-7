export const $ = (selector, parentNode = document) => {
  return parentNode.querySelector(selector);
};

export const $$ = (selector, parentNode = document) => {
  return parentNode.querySelectorAll(selector);
};
