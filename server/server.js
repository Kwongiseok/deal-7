const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { promisePool: DB } = require('./db.js');
const { initSocket } = require('./connection/socket.js');
const chatRouter = require('./router/chatRouter.js');
const authRouter = require('./router/auth.js');
const productRouter = require('./router/product.js');

dotenv.config();
const cors = require('cors');

const { pool } = require('./db.js');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/chat', chatRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

server.listen(PORT, () => {
  console.log('server is running : ', PORT);
});

initSocket(server);
