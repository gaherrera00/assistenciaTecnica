import express from 'express';
import { loginController, cadastro } from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginController, authMiddleware);
router.post('/cadastro', cadastro);

// Rota de Logout
router.post('/logout', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Nenhum usuário autenticado' });
    }
  
    console.log('Usuário deslogando:', req.user?.username);
    
    req.logout((err) => {
      if (err) {
        console.error('Erro no logout:', err);
        return res.status(500).json({ error: 'Erro ao realizar logout' });
      }
      
      // Destrói a sessão completamente
      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          console.error('Erro ao destruir sessão:', destroyErr);
          return res.status(500).json({ error: 'Erro ao encerrar sessão' });
        }
        
        res.clearCookie('connect.sid'); // Remove o cookie de sessão
        res.json({ message: 'Logout realizado com sucesso' });
      });
    });
  });

export default router;