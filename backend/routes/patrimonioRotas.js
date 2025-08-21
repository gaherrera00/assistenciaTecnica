import express from 'express';
import { listarPatrimoniosController, obterPatrimonioPorIdController, criarPatrimonioController, atualizarPatrimonioController, excluirPatrimonioController } from '../controllers/PatrimonioController.js';

const router = express.Router();

router.get('/', listarPatrimoniosController);
router.get('/:id', obterPatrimonioPorIdController);

router.post('/', criarPatrimonioController);

router.put('/:id', atualizarPatrimonioController);

router.delete('/:id', excluirPatrimonioController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;