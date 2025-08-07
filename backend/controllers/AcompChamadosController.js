import { listarChamados, obterChamadoPorId } from "../models/acompChamados.js";

const listarAcompChamadosController = async (req, res) => {
    try {
        const acompChamados = await listarChamados();
        res.status(200).json(acompChamados);
    } catch (err) {
        console.error('Erro ao listar acompanhamento de chamados: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar acompanhamento de chamados. '});
    };
};

const obterAcompChamadoPorIdController = async (req, res) => {
    try {
    acompChamados = await obterChamadoPorId(id);
    res.status(200).json(acompChamados);
    } catch (err) {
        console.error('Erro ao obter acompanhamento de chamado por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter acompanhamento de chamado por ID. '});
    };
};

export { listarAcompChamadosController, obterAcompChamadoPorIdController };