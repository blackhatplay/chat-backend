import { MESSAGE_TYPE } from '../constants';
import { AWAIT_ACK } from './consumer';

export default (socket: any, msg: any) => {
  const message = msg.content.toString();

  const messageJSON = JSON.parse(message);

  if (messageJSON.type === MESSAGE_TYPE.ack) {
    socket.emit('ack', { ...messageJSON });

    AWAIT_ACK[messageJSON.ackId] = msg;
  } else {
    socket.emit('reply', { ...messageJSON, type: MESSAGE_TYPE.reply, chatID: messageJSON.from });

    AWAIT_ACK[messageJSON.id] = msg;
  }
};
