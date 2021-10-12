import express from 'express';
import jwt from 'jsonwebtoken';
import sequelize from '../connections/db';

const router = express.Router();

router.use('/', (req, res) => {
    try {
        const { mobile } = req.body;

        console.log(mobile);

        if (mobile) {
            jwt.sign({ mobile }, process.env.JWT_SECRET as string, (error: any, token: any) => {
                if (error) {
                    return console.log(error);
                }

                res.json({ token });
            });
        } else {
            res.json({
                error: {
                    message: 'Invalid Input',
                },
            });
        }
    } catch (error) {
        res.json({
            error: {
                message: 'something went wrong',
            },
        });
    }
});

export default router;
