import { Connection } from 'amqplib/callback_api';
import rabbitMQConnection from '../connections/rabbitMQ';

interface Option {
  recipient: string;
}

export const CHANNELS: { [key: string]: any } = {};

export const AWAIT_ACK: { [key: string]: any } = {};

let conn: Connection;

rabbitMQConnection()
  .then((connection: any) => {
    conn = connection;
  })
  .catch((error) => {
    throw error;
  });

const consumer = (option: Option, cb: (data: string) => void) => {
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
