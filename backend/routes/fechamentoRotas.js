import express from 'express';
import { obterFechamentoPorIdController, excluirFechamentoController } from '../controllers/fechamentoController.js';

const router = express.Router();

router.get('/:id', obterFechamentoPorIdController);

router.delete('/:id', excluirFechamentoController);

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;