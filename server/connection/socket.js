const Websocket = require('ws');
const {
  createChat,
  getReciveChatRoomInfo,
  plusSellerUnreadCount,
  plusBuyerUnreadCount,
  updateLastChat,
} = require('../data/chat');

const rooms = new Map();

class Socket {
  constructor(server) {
    this.wss = new Websocket.Server({
      server,
      verifyClient: async (info, cb) => {
        const [productId, buyerId, sellerId] = info.req.url.split('/').slice(2);
        const roomId = `${productId}${buyerId}`;
        // info.req.user = token으로부터 얻은 id;
        info.req.user = Math.random() * 100;
        info.req.room = roomId;
        const roomInfo = await getReciveChatRoomInfo(roomId);

        if (String(roomInfo.buyer) === buyerId || String(roomInfo.seller) === sellerId) {
          info.req.isBuyer = String(roomInfo.buyer) === buyerId;
        }
        info.req.isBuyer = String(roomInfo.buyer) === buyerId;
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
        updateLastChat(room, data);
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

// 방에 있는 사람들에게 메세지를 전달과 동시에 unread counting
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
          break;
        }
      }
    }
    if (count !== 0) return;

    if (isBuyer) plusSellerUnreadCount(identify.room);
    else plusBuyerUnreadCount(identify.room);
    resolve('succ');
  });
}
module.exports = {
  initSocket,
  getSocketWS,
};
