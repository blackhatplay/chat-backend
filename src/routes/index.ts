import express from 'express';

const router = express.Router();
import signInController from '../controllers/signIn';
import verify from '../controllers/verify';
import authenticate from '../middleware/authenticate';

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.get('/signin', signInController);
router.get('/verify', authenticate, verify);

export default router;
