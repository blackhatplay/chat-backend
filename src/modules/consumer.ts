import amqp from 'amqplib/callback_api';

interface Option {
  recipient: string;
}

export const CHANNELS: { [key: string]: any } = {};

export const AWAIT_ACK: { [key: string]: any } = {};

const consumer = (conn: amqp.Connection, option: Option, cb: (data: string) => void) => {
  conn.createChannel((err, ch) => {
    if (err != null) throw err;

    CHANNELS[option.recipient] = ch;
    ch.assertQueue(option.recipient);
    ch.consume(option.recipient, function (msg) {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log(message);

        cb(msg.content.toString());
        AWAIT_ACK[JSON.parse(message).id] = msg;
      }
    });
  });
};

export default consumer;
