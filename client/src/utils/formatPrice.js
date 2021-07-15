export default function formatPrice(price) {
  const number = price.replace(/[^0-9]/g, '');
  const convertPrice = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  if (convertPrice) {
    return `₩ ${convertPrice}`;
  } else {
    return '';
  }
}
