import { listarChamados, obterChamadoPorId, criarChamado, atualizarChamado, excluirChamado } from "../models/chamado.js";

const listarChamadosController = async (req, res) => {
    try {
        const chamados = await listarChamados();
        res.status(200).json(chamados);
    } catch (err) {
        console.error('Erro ao listar chamados: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar chamados. '});
    };
};

const obterChamadoPorIdController = async (req, res) => {
    try {
    chamados = await obterChamadoPorId(id);
    res.status(200).json(chamados);
    } catch (err) {
        console.error('Erro ao obter chamado por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter chamado por ID. '});
    };
};

const criarChamadoController = async (req, res) => {
    try {
        const { nome, sala, ra, turma, id_maquina, sintoma, detalhes, inicio, frequencia, historico } = req.body;

        // monta o objeto com os dados
        const chamadoData = {
            nome: nome,
            sala: sala,
            ra: ra,
            turma: turma,
            id_maquina: id_maquina,
            sintoma: sintoma,
            detalhes: detalhes,
            inicio: inicio,
            frequencia: frequencia,
            historico: historico
        };
    
        const chamadoId = await criarChamado(chamadoData);
        res.status(201).json({ mensagem: 'Chamado criado com sucesso.', chamadoId });
    } catch (err) {
        console.error('Erro ao criar chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar chamado.' });
    }
};

const atualizarChamadoController = async (req, res) => {
    try {
        const chamadoId = req.params.id;
        const { nome, sala, ra, turma, id_maquina, sintoma, detalhes, inicio, frequencia, historico } = req.body;

        // monta o objeto com os dados
        const chamadoData = {
            nome: nome,
            sala: sala,
            ra: ra,
            turma: turma,
            id_patrimonio: id_maquina,
            sintoma: sintoma,
            detalhes: detalhes,
            inicio: inicio,
            frequencia: frequencia,
            historico: historico
        };

        await atualizarChamado(chamadoId, chamadoData);
        res.status(201).json({ mensagem: 'Chamado alterado com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar chamado.' });
    }
};

const excluirChamadoController = async (req, res) => {
    try {
        const chamadoId = req.params.id;
        await excluirChamado(chamadoId);
        res.status(200).json({ mensagem: 'Chamado excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir chamado.' });
    }
};

export { listarChamadosController, obterChamadoPorIdController, criarChamadoController, atualizarChamadoController, excluirChamadoController };