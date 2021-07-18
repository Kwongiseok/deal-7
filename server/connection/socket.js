// const { Server } = require('socket.io');
const Websocket = require('ws');
const { createChat, getReciveChatRoomInfo, createChatRoom } = require('../data/chat');

// id(PK), product_id, seller, buyer, lastChat, lastChatTime, chats

const rooms = new Map();

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
      verifyClient: async (info, cb) => {
        const parsedUrl = info.req.url.split('/');
        const [productId, buyerId, sellerId] = [parsedUrl[1], parsedUrl[2], parsedUrl[3]];
        const roomId = parseInt(String(productId) + String(buyerId));

        // const roomInfo = await getReciveChatRoomInfo(roomId);
        const roomInfo = await getReciveChatRoomInfo(roomId);
        info.req.user = Math.random() * 10; // JWT 인증했던 것,
        if (roomInfo.buyerId == buyerId || roomInfo.sellerId == info.req.user) {
          cb(true);
        } else if (roomInfo[0].length === 0) {
          createChatRoom(parseInt(roomId), parseInt(productId), parseInt(sellerId), parseInt(buyerId));
        }
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
        createChat(data, req.user, room);
        msgSender(rooms.get(user), data);
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
