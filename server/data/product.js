const { pool } = require('../db');

async function getProductSeller(productid) {
  return pool.execute(`SELECT userId FROM PRODUCT WHERE id=?`, [productid]).then((res) => res[0][0]);
}

module.exports = {
  getProductSeller,
};
