import { Server, Socket } from 'socket.io';
import { MESSAGE_TYPE } from '../constants';
import consumer from '../modules/consumer';
import publisher from '../modules/publisher';
import ack from './ack';
import disconnect from './disconnect';
import message from './message';
import ackBack from './ackBack';
import handleConsumerMessage from '../modules/handleConsumerMessage';
import sendAck from './sendAck';

export default (io: Server, socket: Socket) => {
  const { id: clientID, mobile } = (socket as any).request.user;

  if (clientID) {
    console.log(`connection : [${clientID}]`);

    consumer({ chatID: clientID as string }, (data) => {
      handleConsumerMessage(socket, data);
    });
  }

  socket.on('message', (msg) => {
    sendAck(clientID, msg);

    message(msg, { clientID, mobile });
  });

  socket.on('ack', (ackData) => {
    ack(ackData, clientID as string);
  });

  socket.on('ackBack', (ackBackData) => {
    ackBack(ackBackData, clientID);
  });

  socket.on('disconnect', () => {
    disconnect(clientID as string);
  });
};
