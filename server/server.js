const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { promisePool: DB } = require('./db.js');
const { initSocket } = require('./connection/socket.js');
const chatRouter = require('./router/chatRouter.js');

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/chat', chatRouter);

server.listen(PORT, () => {
  console.log('server is running : ', PORT);
});

initSocket(server);
