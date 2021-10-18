interface Message {
  chatID: string;
  message: string;
  [key: string]: any;
}

const newMessage = (data: Message, attributes: any) => {
  return {
    ...data,
    from: attributes.clientID,
    mobile: attributes.mobile,
  };
};

export default newMessage;
