import { listarApontamentos, obterApontamentoPorId, criarApontamento, excluirApontamento } from '../models/apontamentos.js';

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
        const { chamado_id, tecnico_id, descricao, comeco, fim, duracao, criado_em } = req.body;

        const apontamentoData = {
            chamado_id: chamado_id,
            tecnico_id: tecnico_id,
            descricao: descricao,
            comeco: comeco,
            fim: fim,
            duracao: duracao,
            criado_em: criado_em
        }

        const apontamentoId = await criarApontamento(apontamentoData);
        res.status(201).josn({ mensagem: 'Apontamento criado com sucesso.', apontamentoId});
    } catch (err) {
        console.error('Erro ao criar apontamentos: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar apontamentos.' });
    }
};

const excluirApontamentoController = async (req, res) => {
    try {
        const apontamentoId = req.params.id;
        await excluirApontamento(apontamentoId);
        res.status(200).json({ mensagem: 'Apontamento excluido com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir apontamento: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir apontamento.' });
    }
}

export { listarApontamentosController, obterApontamentoPorIdController, criarApontamentoController, excluirApontamentoController };