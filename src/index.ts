// eslint-disable-next-line
require('dotenv').config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import routes from './routes';
import connection from './events/connection';
import db from './connections/db';
import User from './models/User';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);

app.use(routes);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
  },
});

io.use((socket: any, next) => {
  const token = socket.handshake.query.auth;

  if (token) {
    jwt.verify(token as string, process.env.JWT_ACCESS_SECRET!, async (err, decoded) => {
      if (err) {
        const error = new Error('not authorized');
        return next(error);
      }

      const user: any = await User.findOne({ where: { id: decoded?.id } });

      socket.request.user = user;

      next();
    });
  } else {
    const err = new Error('not authorized');
    next(err);
  }
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
