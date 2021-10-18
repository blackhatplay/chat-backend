import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default (req: any, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET!, (error: any, decoded: any) => {
      if (error) {
        res.status(401).json({ message: 'unauthorized' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'unauthorized' });
  }
};
