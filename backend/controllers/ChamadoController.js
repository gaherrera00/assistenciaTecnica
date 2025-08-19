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
        const {titulo, descricao} = req.body;
    
        const chamadoData = {
            titulo: titulo, 
            descricao: descricao
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
        const chamadoId = req.params.id;
        const {titulo, descricao, tipo_id, tecnico_id, usuario_id} = req.body;
        
        // requisição do conteudo enviado pelo criador da noticia
        const chamadoData = {
            titulo: titulo, 
            descricao: descricao,
            tipo_id: tipo_id,
            tecnico_id: tecnico_id,
            usuario_id: usuario_id
        }

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