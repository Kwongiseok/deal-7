// const { Server } = require('socket.io');
const Websocket = require('ws');
const {
  createChat,
  getReciveChatRoomInfo,
  createChatRoom,
  plusSellerUnreadCount,
  resetBuyerUnreadCount,
  plusBuyerUnreadCount,
} = require('../data/chat');

// id(PK), product_id, seller, buyer, lastChat, lastChatTime, chats

const rooms = new Map();

class Socket {
  constructor(server) {
    this.wss = new Websocket.Server({
      server,
      verifyClient: async (info, cb) => {
        const parsedUrl = info.req.url.split('/');
        const [productId, buyerId, sellerId] = [parsedUrl[2], parsedUrl[3], parsedUrl[4]];
        const roomId = parseInt(String(productId) + String(buyerId));
        info.req.user = sellerId;
        info.req.room = roomId;
        const roomInfo = await getReciveChatRoomInfo(roomId);
        if (roomInfo.buyer == buyerId || roomInfo.seller == sellerId) {
          info.req.isBuyer = roomInfo.buyer == buyerId;
        }
        info.req.isBuyer = roomInfo.buyer == buyerId;
        cb(true);
      },
    });

    // this.wss -> 소켓 서버 , ws -> 접속해온 클라이언트 소켓,
    this.wss.on('connection', (ws, req) => {
      console.log('socket client connected');
      const user = req.user;
      const room = req.room;
      const isBuyer = req.isBuyer;
      rooms.set(user, { user, room, ws });

      ws.on('message', (data) => {
        createChat(data, user, room);
        msgSender(rooms.get(user), isBuyer, data);
      });
      ws.on('close', (res) => {
        rooms.delete(user);
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

function msgSender(identify, isBuyer, message) {
  return new Promise((resolve, reject) => {
    let count = 0;
    for (let target of rooms.entries()) {
      //방 목록 객체를 반복문을 활용해 발송
      if (identify.room == target[1].room) {
        //같은방에 있는 사람이면 전송
        if (identify.ws !== target[1].ws) {
          count += 1;
          target[1].ws.send(message);
        }
      }
    }
    if (count === 0) {
      if (isBuyer) {
        console.log(isBuyer);
        // buyer가 보냄
        plusSellerUnreadCount(identify.room);
      } else {
        plusBuyerUnreadCount(identify.room);
      }
    }
    resolve('succ');
  });
}
module.exports = {
  initSocket,
  getSocketWS,
};
