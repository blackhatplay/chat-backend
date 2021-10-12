import { Request, Response } from 'express';
import generateOtp from '../modules/generateOtp';
import Otp from '../models/Otp';
import signOtpJwt from '../modules/signOtpJwt';

const JWT_EXP = process.env.JWT_EXP as string;

export default async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;

    if (mobile) {
      const otp = generateOtp();

      const dbOtp: any = await Otp.findOne({ where: { mobile } });

      if (dbOtp) {
        dbOtp.otp = otp;

        await dbOtp.save();
      } else {
        await Otp.create({ mobile, otp });
      }

      const token = await signOtpJwt({ mobile }, { expiresIn: JWT_EXP });

      res.json({ token });
    } else {
      res.json({
        error: {
          message: 'Invalid Input',
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: {
        message: 'something went wrong',
      },
    });
  }
};
