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

let roomnumber = 1;
class Socket {
  constructor(server) {
    this.wss = new Websocket.Server({
      server,
      verifyClient: (info, cb) => {
        const parsedUrl = info.req.url.split('/');
        const [productId, buyerId] = [parsedUrl[1], parsedUrl[3]];
        const roomId = parseInt(String(productId) + String(buyerId));
        info.req.user = Math.random() * 10; // JWT 인증했던 것,
        info.req.room = roomId;
        cb(true);
      },
    });

    // this.wss -> 소켓 서버 , ws -> 접속해온 클라이언트 소켓,
    this.wss.on('connection', (ws, req) => {
      console.log('socket client connected');
      const user = req.user;
      const room = req.room;
      rooms.set(user, { user, room, ws });
      ws.on('message', (data) => {
        createChat(data, '기석', 1);
        msgSender(rooms.get(user), data);
        // this.wss.clients.forEach(function each(client) {
        //   if (client !== ws && client.readyState === Websocket.OPEN) {
        //     client.send(`${data}`);
        //   }
        // });
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

function msgSender(identify, message) {
  return new Promise((resolve, reject) => {
    for (let target of rooms.entries()) {
      //방 목록 객체를 반복문을 활용해 발송
      if (identify.room == target[1].room) {
        //같은방에 있는 사람이면 전송
        if (identify.ws !== target[1].ws) {
          target[1].ws.send(message);
        }
      }
    }
    resolve('succ');
  });
}
module.exports = {
  initSocket,
  getSocketWS,
};
