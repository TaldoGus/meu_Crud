import { Router } from 'express';
import {
  register,
  login,
  getUsers,
  getUser,
  updateUserData,
  removeUser
} from '../controllers/userController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rota protegida para pegar dados do usuário autenticado
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// CRUD protegido
router.get('/', verifyToken, getUsers);          // Listar todos (admin)
router.get('/:id', verifyToken, getUser);        // Ver 1 (admin ou o próprio)
router.put('/:id', verifyToken, updateUserData); // Atualizar (admin ou o próprio)
router.delete('/:id', verifyToken, removeUser);  // Deletar (admin)

export default router;
