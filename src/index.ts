require('dotenv').config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import amqp from 'amqplib/callback_api';
import publisher from './modules/publisher';
import consumer, { AWAIT_ACK, CHANNELS } from './modules/consumer';
import newMessage from './modules/newMessage';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = createServer(app);

app.use(routes);

amqp.connect(process.env.RABBIT_MQ_CONN_URL!, function (err: any, conn: any) {
  if (err != null) throw err;

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    // ...
    const { id: clientID } = socket.handshake.query;
    console.log(`connection : [${clientID}]`);

    if (clientID) {
      socket.join(clientID);

      socket.join(clientID); // We are using room of socket io
      consumer(conn, { recipient: clientID as string }, (data) =>
        io.to(clientID).emit('reply', { ...JSON.parse(data), type: 'reply' }),
      );
    }

    socket.on('message', (msg) => {
      const message = newMessage(msg);

      publisher(conn, message);
    });

    socket.on('ack', (ackData) => {
      try {
        const ch = CHANNELS[clientID as string];

        const msg = AWAIT_ACK[ackData.id];

        ch.ack(msg);
      } catch (error) {
        console.log('ACK_FAILED', error);
      }
    });

    socket.on('disconnect', () => {
      const ch = CHANNELS[clientID as string];

      if (ch) {
        ch.close();
      }
    });
  });
});

httpServer.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
