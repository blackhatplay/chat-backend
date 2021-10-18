import { Connection } from 'amqplib/callback_api';
import rabbitMQConnection from '../connections/rabbitMQ';
import { MESSAGE_TYPE } from '../constants';

interface Option {
  chatID: string;
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

const consumer = (option: Option, cb: (data: any) => void) => {
  conn.createChannel((err, ch) => {
    if (err != null) throw err;

    ch.on('error', function (err) {
      console.error('[AMQP] channel error', err.message);
    });
    ch.on('close', function () {
      console.log('[AMQP] channel closed');
    });

    CHANNELS[option.chatID] = ch;
    ch.assertQueue(option.chatID);
    ch.consume(
      option.chatID,
      function (msg) {
        if (msg !== null) {
          cb(msg);
        }
      },
      { noAck: false },
    );
  });
};

export default consumer;
