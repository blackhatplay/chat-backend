import { Response } from 'express';
import Otp from '../models/Otp';
import signAccessJwt from '../modules/signAccessJwt';

export default async (req: any, res: Response) => {
  try {
    const { mobile } = req.user;
    const { otp } = req.body;

    if (otp) {
      const dbOtp: any = await Otp.findOne({ where: { mobile } });

      if (dbOtp.otp === otp) {
        const accessToken = await signAccessJwt({ mobile });

        return res.json({ accessToken });
      }
    }

    res.json({
      error: {
        message: 'invalid input',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
