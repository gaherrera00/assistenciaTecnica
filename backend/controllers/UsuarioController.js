import { listarUsuarios, obterUsuarioPorId, excluirUsuario } from "../models/usuarios.js";

const listarUsuariosController = async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        res.status(200).json(usuarios);
    } catch (err) {
        console.error('Erro ao listar usuarios: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar usuarios. '});
    };
};

const obterUsuarioPorIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await obterUsuarioPorId(id);
        res.status(200).json(usuario);
    } catch (err) {
        console.error('Erro ao obter usuario por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter usuario por ID.' });
    }
};

const excluirUsuarioController = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        await excluirUsuario(usuarioId);
        res.status(200).json({ mensagem: 'Usuario excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir usuario: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir usuario.' });
    }
};

export { listarUsuariosController, obterUsuarioPorIdController, excluirUsuarioController };