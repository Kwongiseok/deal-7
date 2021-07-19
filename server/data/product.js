const { pool } = require('../db');

async function getProductSeller(productid) {
  return pool.execute(`SELECT userId FROM PRODUCT WHERE id=?`, [productid]);
}

module.exports = {
  getProductSeller,
};
