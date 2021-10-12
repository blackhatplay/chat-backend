import amqp from 'amqplib/callback_api';

interface Option {
    recipient: string;
    message: string;
    type?: string;
}

const publisher = (conn: amqp.Connection, option: Option) => {
    conn.createChannel((err, ch) => {
        if (err != null) throw err;
        ch.assertQueue(option.recipient);
        ch.sendToQueue(option.recipient, Buffer.from(JSON.stringify(option)));
    });
};

export default publisher;
