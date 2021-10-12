import { v4 as uuidv4 } from 'uuid';

interface Message {
    recipient: string;
    message: string;
    [key: string]: any;
}

const newMessage = (data: Message) => {
    return {
        ...data,
        id: uuidv4(),
    };
};

export default newMessage;
