import express from 'express';
import { listarAcompChamadosController, obterAcompChamadoPorIdController } from '../controllers/AcompChamadosController.js';

const router = express.Router();

router.get('/', listarAcompChamadosController);
router.get('/:id', obterAcompChamadoPorIdController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET');
    res.status(204).send();
});

export default router;