const http = require('http');
const express = require('express');
const cors = require('cors');

const { pool } = require('./db.js');
const authRouter = require('./router/auth.js');
const townRouter = require('./router/town.js');
const productRouter = require('./router/product.js');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/town', townRouter);
app.use('/product', productRouter);

server.listen(PORT, () => {
  console.log('server is running : ', PORT);
});
