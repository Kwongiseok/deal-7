// const { Server } = require('socket.io');
const Websocket = require('ws');
const { createChat } = require('../data/chat');

// id(PK), product_id, seller, buyer, lastChat, lastChatTime, chats

const rooms = new Map();

let chatRoom = {
  id: 1,
  product_id: 1234,
  seller: 154,
  buyer: 123,
  lastChat: '1번입니다',
  lastChatTime: new Date(),
  unreadChatcounts: 0,
};

let chats = [
  {
    author: 'seller',
    text: '안녕하세요',
  },
  {
    author: 'buyer',
    text: '안녕하세용',
  },
];

class Socket {
  constructor(server) {
    this.wss = new Websocket.Server({
      server,
      verifyClient: (info, cb) => {
        console.log(info.req.url.query);
        info.req.user = Math.random() * 10;
        cb(true);
      },
    });

    // this.wss -> 소켓 서버 , ws -> 접속해온 클라이언트 소켓,
    this.wss.on('connection', (ws, req) => {
      console.log('socket client connected');
      console.log(req.user);

      ws.on('message', (data) => {
        createChat(data, '기석', 1);
        this.wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === Websocket.OPEN) {
            client.send(`${data}`);
          }
        });
      });
    });
  }
}

let socket;

function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}
function getSocketWS() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.ws;
}

module.exports = {
  initSocket,
  getSocketWS,
};
