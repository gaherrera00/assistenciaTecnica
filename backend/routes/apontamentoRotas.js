import express from 'express';
import { listarApontamentosController, obterApontamentoPorIdController, criarApontamentoController, excluirApontamentoController } from '../controllers/ApontamentoController.js';

const router = express.Router();

router.get('/', listarApontamentosController);
router.get('/:id', obterApontamentoPorIdController);

router.post('/', criarApontamentoController);

router.delete('/:id', excluirApontamentoController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;