import { listarChamados, obterChamadoPorId, criarChamado, atualizarChamado, excluirChamado } from "../models/chamado.js";
import { excluirApontamento } from "../models/apontamentos.js";
import { read, deleteRecord } from '../config/database.js';

const listarChamadosController = async (req, res) => {
    try {
        // Verificar se o usuário está autenticado
        if (!req.user) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        const { funcao, ra } = req.user;
        let chamados;

        // Filtrar chamados baseado na função do usuário
        if (funcao === 'aluno') {
            // Alunos veem apenas seus próprios chamados
            chamados = await listarChamados(`ra = '${ra}'`);
        } else if (funcao === 'tecnico' || funcao === 'técnico' || funcao === 'gerente' || funcao === 'administrador') {
            // Técnicos, gerentes e administradores veem todos os chamados
            chamados = await listarChamados();
        } else {
            console.log('Função não reconhecida:', funcao);
            return res.status(403).json({ mensagem: `Função não autorizada: ${funcao}` });
        }

        res.status(200).json(chamados);
    } catch (err) {
        console.error('Erro ao listar chamados: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar chamados. ' });
    };
};

const obterChamadoPorIdController = async (req, res) => {
    try {
        const id = req.params.id;
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

        // Verificar se o RA existe na tabela de usuários
        const usuarioExiste = await read('usuarios', `ra = '${ra}'`);
        if (!usuarioExiste || usuarioExiste.length === 0) {
            return res.status(400).json({ mensagem: "RA informado não pertence a nenhum usuário cadastrado." });
        }


        const chamadoId = await criarChamado(chamadoData);
        res.status(201).json({ mensagem: 'Chamado criado com sucesso.', chamadoId });
    } catch (err) {
        console.error('Erro ao criar chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar chamado.' });
    }
};

const atualizarChamadoController = async (req, res) => {
    try {
        // Verificar se o usuário está autenticado
        if (!req.user) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        const chamadoId = req.params.id;
        const { nome, ra, turma, id_patrimonio, sintoma, detalhes, inicio, frequencia, historico, status } = req.body;
        const { funcao } = req.user;

        // Verificar permissões baseado na função
        if (funcao === 'aluno') {
            return res.status(403).json({ mensagem: 'Alunos não podem atualizar chamados' });
        }

        // Validações
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

        // Validar status se fornecido
        if (status && !['pendente', 'em andamento', 'concluído'].includes(status)) {
            return res.status(400).json({ mensagem: "Status inválido." });
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
            historico: historico ?? null,
            status: status ?? null
        };

        // Remover campos undefined/null
        Object.keys(chamadoData).forEach(key => {
            if (chamadoData[key] === null || chamadoData[key] === undefined) {
                delete chamadoData[key];
            }
        });

        await atualizarChamado(chamadoId, chamadoData);
        res.status(201).json({ mensagem: 'Chamado alterado com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar chamado.' });
    }
};

const excluirChamadoController = async (req, res) => {
    try {
        // Verificar se o usuário está autenticado
        if (!req.user) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        // Verificar se o usuário é administrador
        if (req.user.funcao !== 'administrador' && req.user.funcao !== 'gerente') {
            return res.status(403).json({ mensagem: 'Apenas administradores podem excluir chamados' });
        }

        const chamadoId = req.params.id;

        // Verificar se o chamado existe
        const chamado = await read('chamados', `id_chamado = ${chamadoId}`);
        if (!chamado || chamado.length === 0) {
            return res.status(404).json({ mensagem: 'Chamado não encontrado' });
        }

        // Verificar se o chamado está em andamento
        if (chamado[0].status !== 'em andamento') {
            return res.status(400).json({ mensagem: 'Apenas chamados em andamento podem ser excluídos' });
        }

        // Primeiro, excluir todos os apontamentos relacionados ao chamado
        await deleteRecord('apontamentos', `id_chamado = ${chamadoId}`);

        // Depois, excluir o chamado
        await excluirChamado(chamadoId);

        res.status(200).json({ mensagem: 'Chamado excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir chamado.' });
    }
};

export { listarChamadosController, obterChamadoPorIdController, criarChamadoController, atualizarChamadoController, excluirChamadoController };