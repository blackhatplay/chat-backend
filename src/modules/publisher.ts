import { Connection } from 'amqplib/callback_api';

import rabbitMQConnection from '../connections/rabbitMQ';

interface Option {
  chatID: string;
  message?: string;
  type?: string;
}

let conn: Connection;

rabbitMQConnection()
  .then((connection: any) => {
    conn = connection;
  })
  .catch((error) => {
    throw error;
  });

const publisher = (option: Option) => {
  conn.createChannel((err, ch) => {
    if (err != null) throw err;

    ch.assertQueue(option.chatID);
    ch.sendToQueue(option.chatID, Buffer.from(JSON.stringify(option)));
  });
};

export default publisher;
