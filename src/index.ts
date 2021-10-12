// eslint-disable-next-line
require('dotenv').config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes';
import connection from './events/connection';
import db from './connections/db';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);

app.use(routes);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  connection(io, socket);
});

db.sync()
  .then(() => {
    console.log('Connection to db established');
    httpServer.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
  })
  .catch((err) => console.log(err));
