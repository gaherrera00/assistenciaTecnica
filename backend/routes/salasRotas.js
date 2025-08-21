import express from 'express';
import { listarSalasController, obterSalaPorIdController, criarSalaController, atualizarSalaController, excluirSalaController } from '../controllers/SalasController.js';

const router = express.Router();

router.get('/', listarSalasController);
router.get('/:id', obterSalaPorIdController);

router.post('/', criarSalaController);

router.put('/:id', atualizarSalaController);

router.delete('/:id', excluirSalaController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;