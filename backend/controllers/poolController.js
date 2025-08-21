import { listarPool, obterPoolPorId, criarPool, atualizarPool, excluirPool } from '../models/pool.js';

const listarPoolController = async (req, res) => {
    try {
        const pool = await listarPool();
        res.status(200).json(pool);
    } catch (err) {
        console.error('Erro ao listar pool: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar pool. '});
    };
};

const obterPoolPorIdController = async (req, res) => {
    try {
    pool = await obterPoolPorId(id);
    res.status(200).json(pool);
    } catch (err) {
        console.error('Erro ao obter pool por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter pool por ID. '});
    };
};

const criarPoolController = async (req, res) => {
    try {
        const { titulo, descricao, created_by, updated_by } = req.body;
    
        const poolData = {
            titulo: titulo ?? null,
            descricao: descricao ?? null,
            created_by: created_by ?? null,
            updated_by: updated_by ?? null
          };
    
        const poolId = await criarPool(poolData);
        res.status(201).json({ mensagem: 'Pool criado com sucesso.', poolId });
    } catch (err) {
        console.error('Erro ao criar pool: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar pool.' });
    }
};

const atualizarPoolController = async (req, res) => {
    try {
        const poolId = req.params.id;
        const { titulo, descricao, criado_em, atualizado_em } = req.body;
    
        const poolData = {
            titulo: titulo, 
            descricao: descricao,
            criado_em: criado_em,
            atualizado_em: atualizado_em
        }
        
        await atualizarPool(poolId, poolData);
        res.status(201).json({ mensagem: 'Erro ao atualizar pool.' })
    } catch (err) {
        console.error('Erro ao atualizar pool: ', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar pool.' });
    }
};

const excluirPoolController = async (req, res) => {
    try {
        const poolId = req.params.id;
        await excluirPool(poolId);
        res.status(200).json({ mensagem: 'Pool excluido com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir pool: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir pool.' });
    }
};

export { listarPoolController, obterPoolPorIdController, criarPoolController, atualizarPoolController, excluirPoolController };