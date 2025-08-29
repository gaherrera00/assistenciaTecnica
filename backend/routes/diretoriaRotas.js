import express from 'express';
import { listarUsuariosController, obterUsuarioPorIdController, excluirUsuarioController } from '../controllers/UsuarioController.js';

const router = express.Router();

router.get('/', listarUsuariosController);
router.get('/:id', obterUsuarioPorIdController);

router.delete('/:id', excluirUsuarioController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;