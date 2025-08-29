import { listarChamados, obterChamadoPorId, criarChamado, atualizarChamado, excluirChamado } from "../models/chamado.js";
import { read } from '../config/database.js';

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
        const { id } = req.params;
        const chamado = await obterChamadoPorId(id);
        res.status(200).json(chamado);
    } catch (err) {
        console.error('Erro ao obter chamado por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter chamado por ID.' });
    }
};

const criarChamadoController = async (req, res) => {
    try {
        const { nome, ra, turma, id_patrimonio, sintoma, detalhes, inicio, frequencia, historico } = req.body;

        if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
            return res.status(400).json({ mensagem: "Nome é obrigatório e deve ter ao menos 3 caracteres." });
        }

        if (!ra || typeof ra !== "number" || ra.toString().length < 1) {
            return res.status(400).json({ mensagem: "RA é obrigatório e deve ser um número válido." });
        }

        if (!turma || typeof turma !== "string" || turma.trim().length < 2) {
            return res.status(400).json({ mensagem: "Turma é obrigatória e deve ter ao menos 2 caracteres." });
        }

        const validarPatrimonio = await read('patrimonios', `id_patrimonio = '${id_patrimonio}'`);
        if (!validarPatrimonio || validarPatrimonio.length === 0) {
            return res.status(400).json({ mensagem: "Patrimônio não encontrado." });
        }

        if (!sintoma || typeof sintoma !== "string" || sintoma.trim().length < 5) {
            return res.status(400).json({ mensagem: "Sintoma é obrigatório e deve ter ao menos 5 caracteres." });
        }

        if (detalhes && typeof detalhes !== "string") {
            return res.status(400).json({ mensagem: "Detalhes devem ser texto." });
        }

        if (inicio && isNaN(Date.parse(inicio))) {
            return res.status(400).json({ mensagem: "Data de início inválida." });
        }

        if (frequencia && typeof frequencia !== "string") {
            return res.status(400).json({ mensagem: "Frequência deve ser texto." });
        }

        if (historico && typeof historico !== "string") {
            return res.status(400).json({ mensagem: "Histórico deve ser texto." });
        }

        // monta o objeto com os dados
        const chamadoData = {
            nome: nome ?? null,
            ra: ra ?? null,
            turma: turma ?? null,
            id_patrimonio: id_patrimonio,
            sintoma: sintoma ?? null,
            detalhes: detalhes ?? null,
            inicio: inicio ?? null,
            frequencia: frequencia ?? null,
            historico: historico ?? null
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
        const { nome, ra, turma, id_patrimonio, sintoma, detalhes, inicio, frequencia, historico } = req.body;

        if (nome && (typeof nome !== "string" || nome.trim().length < 3)) {
            return res.status(400).json({ mensagem: "Nome deve ter ao menos 3 caracteres." });
        }

        if (ra && (typeof ra !== "number" || ra.toString().length < 1)) {
            return res.status(400).json({ mensagem: "RA inválido." });
        }

        if (turma && (typeof turma !== "string" || turma.trim().length < 2)) {
            return res.status(400).json({ mensagem: "Turma inválida." });
        }

        if (sintoma && (typeof sintoma !== "string" || sintoma.trim().length < 5)) {
            return res.status(400).json({ mensagem: "Sintoma deve ter ao menos 5 caracteres." });
        }

        if (detalhes && typeof detalhes !== "string") {
            return res.status(400).json({ mensagem: "Detalhes devem ser texto." });
        }

        if (inicio && isNaN(Date.parse(inicio))) {
            return res.status(400).json({ mensagem: "Data de início inválida." });
        }

        if (frequencia && typeof frequencia !== "string") {
            return res.status(400).json({ mensagem: "Frequência deve ser texto." });
        }

        if (historico && typeof historico !== "string") {
            return res.status(400).json({ mensagem: "Histórico deve ser texto." });
        }

        // monta o objeto com os dados
        const chamadoData = {
            nome: nome ?? null,
            ra: ra ?? null,
            turma: turma ?? null,
            id_patrimonio: id_patrimonio ?? null,
            sintoma: sintoma ?? null,
            detalhes: detalhes ?? null,
            inicio: inicio ?? null,
            frequencia: frequencia ?? null,
            historico: historico ?? null
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