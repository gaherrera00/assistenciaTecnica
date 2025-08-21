import { listarSalas, obterSalasPorId, criarSalas, atualizarSalas, excluirSalas } from '../models/salas.js';

const listarSalasController = async (req, res) => {
    try {
        const salas = await listarSalas();
        res.status(200).json(salas);
    } catch (err) {
        console.error('Erro ao listar salas: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar salas. '});
    };
};

const obterSalaPorIdController = async (req, res) => {
    try {
    salas = await obterSalasPorId(id);
    res.status(200).json(salas);
    } catch (err) {
        console.error('Erro ao obter sala por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter sala por ID. '});
    };
};

const criarSalaController = async (req, res) => {
    try {
        const { nome, sala, ra, turma, id_maquina, sintoma, detalhes, inicio, frequencia, historico } = req.body;

        // monta o objeto com os dados
        const salasData = {
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
    
        const salasId = await criarSalas(salasData);
        res.status(201).json({ mensagem: 'Sala criada com sucesso.', salasId });
    } catch (err) {
        console.error('Erro ao criar sala: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar sala.' });
    }
};

const atualizarSalaController = async (req, res) => {
    try {
        const salasId = req.params.id;
        const { nome, sala, ra, turma, id_maquina, sintoma, detalhes, inicio, frequencia, historico } = req.body;

        // monta o objeto com os dados
        const salasData = {
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

        await atualizarSalas(salasId, salasData);
        res.status(201).json({ mensagem: 'Sala alterada com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar salas: ', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar sala.' });
    }
};

const excluirSalaController = async (req, res) => {
    try {
        const salasId = req.params.id;
        await excluirSalas(salasId);
        res.status(200).json({ mensagem: 'Sala excluída com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir salas: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir sala.' });
    }
};

export { listarSalasController, obterSalaPorIdController, criarSalaController, atualizarSalaController, excluirSalaController };