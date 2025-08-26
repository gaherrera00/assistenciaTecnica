import { listarPatrimonios, obterPatrimonioPorId, criarPatrimonio, atualizarPatrimonio, excluirPatrimonio } from "../models/patrimonio.js";

const listarPatrimoniosController = async (req, res) => {
    try {
        const patrimonios = await listarPatrimonios();
        res.status(200).json(patrimonios);
    } catch (err) {
        console.error('Erro ao listar patrimonios: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar patrimonios. '});
    };
};

const obterPatrimonioPorIdController = async (req, res) => {
    try {
    patrimonios = await obterPatrimonioPorId(id);
    res.status(200).json(patrimonios);
    } catch (err) {
        console.error('Erro ao obter patrimonio por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter patrimonio por ID. '});
    };
};

const criarPatrimonioController = async (req, res) => {
    try {
        const { tipo_item, sala, data_aquisicao, observacoes } = req.body;

        // monta o objeto com os dados
        const patrimonioData = {
            tipo_item: tipo_item || null,
            sala: sala,
            data_aquisicao: data_aquisicao || null,
            observacoes: observacoes || null
        };
    
        const patrimonioId = await criarPatrimonio(patrimonioData);
        res.status(201).json({ mensagem: 'Patrimonio criado com sucesso.', patrimonioId });
    } catch (err) {
        console.error('Erro ao criar patrimonio: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar patrimonio.' });
    }
};

const atualizarPatrimonioController = async (req, res) => {
    try {
        const patrimonioId = req.params.id;
        const { tipo_item, sala, data_aquisicao, observacoes } = req.body;

        // monta o objeto com os dados
        const patrimonioData = {
            tipo_item: tipo_item || null,
            sala: sala,
            data_aquisicao: data_aquisicao || null,
            observacoes: observacoes || null
        };

        await atualizarPatrimonio(patrimonioId, patrimonioData);
        res.status(201).json({ mensagem: 'Patrimonio alterado com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar patrimonio: ', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar patrimonio.' });
    }
};

const excluirPatrimonioController = async (req, res) => {
    try {
        const patrimonioId = req.params.id;
        await excluirPatrimonio(patrimonioId);
        res.status(200).json({ mensagem: 'patrimonio excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir patrimonio: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir patrimonio.' });
    }
};

export { listarPatrimoniosController, obterPatrimonioPorIdController, criarPatrimonioController, atualizarPatrimonioController, excluirPatrimonioController };