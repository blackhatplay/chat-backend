import newMessage from '../modules/newMessage';
import publisher from '../modules/publisher';

export default (msg: any, attributes: any) => {
  const message = newMessage(msg, attributes);

  console.log(message);

  publisher(message);
};
