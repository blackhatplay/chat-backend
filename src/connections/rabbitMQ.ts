import amqp from 'amqplib/callback_api';

const rabbitMQConnection = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.RABBIT_MQ_CONN_URL!, function (err, conn) {
      if (err != null) reject(err);
      resolve(conn);
    });
  });
};

export default rabbitMQConnection;
