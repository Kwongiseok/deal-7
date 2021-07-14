export default function formatPrice(price) {
  let number = price.replace(/[^0-9]/g, '');
  const convertPrice = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  return '₩ ' + convertPrice;
}
