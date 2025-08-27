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
        const { id_chamado, id_tecnico, descricao, comeco, fim, duracao, criado_em } = req.body;

        if (!descricao || typeof descricao !== "string" || descricao.trim().length < 3) {
            return res.status(400).json({ mensagem: "Descrição é obrigatória e deve ter pelo menos 3 caracteres." });
        }

        if (!comeco || isNaN(Date.parse(comeco))) {
            return res.status(400).json({ mensagem: "Data de início (comeco) inválida." });
        }

        if (!fim || isNaN(Date.parse(fim))) {
            return res.status(400).json({ mensagem: "Data de fim (fim) inválida." });
        }

        if (new Date(fim) <= new Date(comeco)) {
            return res.status(400).json({ mensagem: "A data de fim deve ser posterior à data de início." });
        }

        if (!duracao || typeof duracao !== "number" || duracao <= 0) {
            return res.status(400).json({ mensagem: "Duração deve ser um número maior que 0." });
        }

        if (criado_em && isNaN(Date.parse(criado_em))) {
            return res.status(400).json({ mensagem: "Data de criação inválida." });
        }

        const apontamentoData = {
            id_chamado: id_chamado,
            id_tecnico: id_tecnico,
            descricao: descricao,
            comeco: comeco,
            fim: fim,
            duracao: duracao,
            criado_em: criado_em
        }

        const apontamentoId = await criarApontamento(apontamentoData);
        res.status(201).json({ mensagem: 'Apontamento criado com sucesso.', apontamentoId});
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