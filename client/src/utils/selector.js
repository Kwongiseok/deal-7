export const $ = (selector, parentNode = document) => {
  return parentNode.querySelector(selector);
};
