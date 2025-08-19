import { readAll, read } from '../config/database.js';

const listarChamados = async () => {
    try {
        return await readAll('chamados');
    } catch (err) {
        console.error('Erro ao listar chamados: ', err);
    }
};

const obterChamadoPorId = async (id) => {
    try {
        return await read('chamados', `id = ${id}`);
    } catch (err) {
        console.error('Erro ao listar id do chamado: ', err);
        throw err;
    }
};

export { listarChamados, obterChamadoPorId };