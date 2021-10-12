import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (payload: any, option: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, option, (err, token) => {
      if (err) {
        reject({ message: 'internal server error' });
      }

      resolve(token);
    });
  });
};
