const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { initSocket } = require('./connection/socket.js');
const morgan = require('morgan');

const authRouter = require('./router/auth.js');
const townRouter = require('./router/town.js');
const productRouter = require('./router/product.js');
const chatRouter = require('./router/chatRouter.js');

dotenv.config();

const { pool } = require('./db.js');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/chat', chatRouter);
app.use('/auth', authRouter);
app.use('/town', townRouter);
app.use('/product', productRouter);

server.listen(PORT, () => {
  console.log('server is running : ', PORT);
});

initSocket(server);
