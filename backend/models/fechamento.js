import { read, deleteRecord } from '../config/database.js';

const obterFechamentoPorId = async (id) => {
    try {
      return await read('chamados', `id_chamados = ${id}`);
    } catch (error) {
      console.error('Erro ao obter fechamento por ID:', error);
      throw error;
    }
};

const excluirFechamento = async (id) => {
    try {
      await deleteRecord('chamados', `id_chamados = ${id}`);
    } catch (error) {
      console.error('Erro ao excluir fechamento:', error);
      throw error;
    }
};

export { obterFechamentoPorId, excluirFechamento };