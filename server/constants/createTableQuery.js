const CREATE_USER_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS deal.User (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        town VARCHAR(100) NOT NULL,
        likes VARCHAR(500) NOT NULL,
        PRIMARY KEY (id));
`;

const CREATE_PRODUCT_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS deal.Product (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(200) NOT NULL,
        state VARCHAR(45) NOT NULL,
        category VARCHAR(30) NOT NULL,
        createdTime INT NOT NULL,
        content LONGTEXT NOT NULL,
        chatroomCounts INT NOT NULL,
        likeCounts INT NOT NULL,
        views INT NOT NULL,
        seller VARCHAR(100) NOT NULL,
        town VARCHAR(100) NOT NULL,
        price VARCHAR(100) NULL,
        userId INT NOT NULL,
        PRIMARY KEY (id));
`;

module.exports = {
  CREATE_CHATROOM_TABLE_QUERY,
  CREATE_CHAT_TABLE_QUERY,
  CREATE_PRODUCT_TABLE_QUERY,
  CREATE_USER_TABLE_QUERY,
};
