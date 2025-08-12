import { readAll, read } from '../config/database.js';

const listarChamados = async () => {
    try {
        return await readAll('acompChamados');
    } catch (err) {
        console.error('Erro ao listar chamados: ', err);
    }
};

const obterChamadosPorId = async (id) => {
    try {
        return await read('acompChamados', `id = ${id}`);
    } catch (err) {
        console.error('Erro ao listar id do chamado: ', err);
        throw err;
    }
};

export { listarChamados, obterChamadosPorId };