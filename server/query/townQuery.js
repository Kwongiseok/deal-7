const GET_TOWN_VALUE_QUERY = 'SELECT town FROM deal.User WHERE id=?';
const UPDATE_TOWN_VALUE_QUERY = 'UPDATE deal.User SET town=? WHERE id=?';

module.exports = { GET_TOWN_VALUE_QUERY, UPDATE_TOWN_VALUE_QUERY };
