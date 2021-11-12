import express from 'express';

const router = express.Router();
import signInController from '../controllers/signIn';
import verifyController from '../controllers/verify';
import authenticate from '../middleware/authenticate';
import verifyContactController from '../controllers/verifyContact';

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.post('/signin', signInController);
router.post('/verify', authenticate, verifyController);

router.post('/verify-contact', verifyContactController);

export default router;
