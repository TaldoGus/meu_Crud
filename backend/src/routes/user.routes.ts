import { Router } from 'express';
import { register, login } from '../controllers/userController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);

//  Rota protegida
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
