import { listarApontamentos, obterApontamentoPorId, criarApontamento, atualizarApontamento, excluirApontamento } from '../models/apontamentos.js';

const listarApontamentosController = async (req, res) => {
    try {
        const apontamentos = await listarApontamentos();
        res.status(200).json(apontamentos);
    } catch (err) {
        console.error('Erro ao listar apontamentos: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar apontamentos.' });
    }
};

const obterApontamentoPorIdController = async (req, res) => {
    try {
        const apontamentos = await obterApontamentoPorId(id);
        res.status(200).json(apontamentos);
    } catch (err) {
        console.error('Erro ao obter apontamentos por Id: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter apontamentos por Id.' });
    }
};

const criarApontamentoController = async (req, res) => {
    try {
        const { descricao, data_inicio, data_fim } = req.body;

        const apontamentoData = {
            
        }
    } catch (err) {
        console.error('Erro ao criar apontamentos: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar apontamentos.' });
    }
}