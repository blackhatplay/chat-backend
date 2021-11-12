import { Response } from 'express';
import User from '../models/User';

export default async (req: any, res: Response) => {
  try {
    const { mobile } = req.body;

    const user: any = await User.findOne({ where: { mobile } });

    if (user) {
      return res.json({
        id: user.id,
        mobile: user.mobile,
      });
    }

    res.status(404).json({
      error: {
        message: 'no user found',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
