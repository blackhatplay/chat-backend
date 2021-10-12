import express from 'express';

const router = express.Router();
import signInRoute from './singIn';

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.get('/signin', signInRoute);

export default router;
