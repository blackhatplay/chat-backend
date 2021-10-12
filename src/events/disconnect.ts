import { CHANNELS } from '../modules/consumer';

export default (clientID: string) => {
  const ch = CHANNELS[clientID];

  if (ch) {
    ch.close();
  }
};
