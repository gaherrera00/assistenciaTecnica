import { obterFechamentoPorId, excluirFechamento } from '../models/fechamento.js';

const obterFechamentoPorIdController = async (req, res) => {
    try {
    fechamento = await obterFechamentoPorId(id);
    res.status(200).json(fechamento);
    } catch (err) {
        console.error('Erro ao obter fechamento por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter fechamento por ID. '});
    };
};

const excluirFechamentoController = async (req, res) => {
    try {
        const fechamentoId = req.params.id;
        await excluirFechamento(fechamentoId);
        res.status(200).json({ mensagem: 'Fechamento excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir fechamento: ', err);
        res.status(500).json({ mensagem: 'Erro ao fechamento chamado.' });
    }
};

export { obterFechamentoPorIdController, excluirFechamentoController };