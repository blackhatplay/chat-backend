import newMessage from '../modules/newMessage';
import publisher from '../modules/publisher';

export default (msg: any) => {
  const message = newMessage(msg);

  publisher(message);
};
