import express from 'express';
import { loginController, cadastro } from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/cadastro', cadastro);

// Rota de Logout (protegida)
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logout realizado com sucesso' });
});

export default router;