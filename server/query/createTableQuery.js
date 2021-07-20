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
        thumbnail VARCHAR(100),
        seller VARCHAR(100) NOT NULL,
        town VARCHAR(100) NOT NULL,
        price VARCHAR(100) NULL,
        userId INT NOT NULL,
        PRIMARY KEY (id));
`;

//  id(PK), product_id, seller, buyer, lastChat, lastChatTime, chats
const CREATE_CHATROOM_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS deal.ChatRoom (
    id INT NOT NULL,
    productid INT NOT NULL,
    url VARCHAR(100) NOT NULL,
    seller INT NOT NULL,
    buyer INT NOT NULL, 
    sellerin BOOLEAN default '0', 
    buyerin BOOLEAN default '0',
    sellerunread INT default '0',
    buyerunread INT default '0',
    lastchat LONGTEXT,
    lastchattime DATETIME,
    PRIMARY KEY (id));
`;
// FOREIGN KEY (productid) REFERENCES deal.product(id) ON DELETE CASCADE);

const CREATE_CHAT_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS deal.Chat (
  id INT NOT NULL AUTO_INCREMENT,
  author VARCHAR(200) NOT NULL,
  text LONGTEXT NOT NULL,
  createdat DATETIME,
  chatroomid INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (chatroomid) REFERENCES deal.ChatRoom(id) ON DELETE CASCADE);
`;

module.exports = {
  CREATE_CHATROOM_TABLE_QUERY,
  CREATE_CHAT_TABLE_QUERY,
  CREATE_PRODUCT_TABLE_QUERY,
  CREATE_USER_TABLE_QUERY,
};
