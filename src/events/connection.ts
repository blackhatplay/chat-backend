import { Server, Socket } from 'socket.io';
import consumer from '../modules/consumer';
import ack from './ack';
import disconnect from './disconnect';
import message from './message';

export default (io: Server, socket: Socket) => {
  const { id: clientID } = socket.handshake.query;
  console.log(`connection : [${clientID}]`);

  if (clientID) {
    socket.join(clientID);

    socket.join(clientID);
    consumer({ recipient: clientID as string }, (data) =>
      io.to(clientID).emit('reply', { ...JSON.parse(data), type: 'reply' }),
    );
  }

  socket.on('message', message);

  socket.on('ack', (ackData) => {
    ack(ackData, clientID as string);
  });

  socket.on('disconnect', () => {
    disconnect(clientID as string);
  });
};
