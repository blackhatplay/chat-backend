import { Response } from 'express';
import Otp from '../models/Otp';
import User from '../models/User';
import signAccessJwt from '../modules/signAccessJwt';

export default async (req: any, res: Response) => {
  try {
    const { mobile } = req.user;
    const { otp } = req.body;

    if (otp) {
      const dbOtp: any = await Otp.findOne({ where: { mobile } });

      if (dbOtp.otp === otp) {
        let user: any = await User.findOne({ where: { mobile } });

        if (!user) {
          user = await User.create({ mobile });
        }

        const accessToken = await signAccessJwt({ id: user.id });

        return res.json({ accessToken });
      }
    }

    res.status(400).json({
      error: {
        message: 'invalid input',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
