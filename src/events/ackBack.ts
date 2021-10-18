import { AWAIT_ACK, CHANNELS } from '../modules/consumer';

export default (data: any, clientID: string) => {
  try {
    const ch = CHANNELS[clientID as string];
    const msg = AWAIT_ACK[data.ackId];

    ch.ack(msg);
  } catch (error) {
    console.log('ACK_FAILED', error);
  }
};
