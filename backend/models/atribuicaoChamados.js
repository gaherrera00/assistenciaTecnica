import { readAll } from '../config/database.js';

const listarAtribuicao = async () =>  {
    try {
        return await readAll('atribuicao');
    } catch (err) {
        console.error('Erro ao listar atribuição de chamados: ', error);
        throw err;
    }
};

export { listarAtribuicao };