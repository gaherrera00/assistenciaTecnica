import { create, readAll, read, update, deleteRecord } from '../config/database.js';

const listarApontamentos = async () => {
    try {
        return await readAll('apontamentos');
    } catch (err) {
        console.error('Erro ao listar apontamentos: ', error);
        throw err;
    }
};

const obterApontamentoPorId = async (id) => {
    try {
        return await read('apontamentos', `id_apontamentos = ${id}`)
    } catch (err) {
        console.error('Erro ao obter apontamento por Id: ', error);
        throw err;
    }
};

const criarApontamento = async (apontamentoData) => {
    try {
        return await create('apontamentos', apontamentoData);
    } catch (err) {
        console.error('Erro ao criar apontamento: ', err);
        throw err;
    }
};

const atualizarApontamento = async (id, apontamentoData) => {
    try {
        return await update('apontamentos', apontamentoData, `id_apontamentos = ${id}`);
    } catch (err) {
        console.error('Erro ao atualizar apontamento: ', error);
        throw err;
    }
};

const excluirApontamento = async (id) => {
    try {
        return await deleteRecord('apontamentos', `id_apontamentos = ${id}`);
    } catch (err) {
        console.error('Erro ao excluir apontamento: ', err);
        throw err;
    }
};

export { listarApontamentos, obterApontamentoPorId, criarApontamento, atualizarApontamento, excluirApontamento };