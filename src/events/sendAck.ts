import publisher from '../modules/publisher';
import { v4 as uuidv4 } from 'uuid';
import { MESSAGE_TYPE } from '../constants';

export default (clientID: string, msg: any) => {
  const ack = { id: msg.id, ackId: uuidv4(), type: MESSAGE_TYPE.ack };

  publisher({ chatID: clientID, ...ack });
};
