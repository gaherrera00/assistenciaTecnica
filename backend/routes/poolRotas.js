import express from 'express';
import { listarPoolController, obterPoolPorIdController, criarPoolController, atualizarPoolController, excluirPoolController } from '../controllers/PoolController.js';

const router = express.Router();

router.get('/', listarPoolController);
router.get('/:id', obterPoolPorIdController);

router.post('/', criarPoolController);

router.put('/:id', atualizarPoolController);

router.delete('/:id', excluirPoolController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;