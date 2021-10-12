import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

export default (payload: any, option?: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_ACCESS_SECRET, option, (err, token) => {
      if (err) {
        reject({ message: 'internal server error' });
      }

      resolve(token);
    });
  });
};
