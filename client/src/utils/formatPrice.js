export default function formatPrice(price) {
  price = price.replace(/\,/g, '');
  const convertPrice = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  return convertPrice;
}
