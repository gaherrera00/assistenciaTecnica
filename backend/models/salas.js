import { create, readAll, read, update, deleteRecord } from '../config/database.js';

const listarSalas = async () => {
  try {
    return await readAll('salas');
  } catch (error) {
    console.error('Erro ao listar salas:', error);
    throw error;
  }
};

const obterSalasPorId = async (id) => {
  try {
    return await read('salas', `id_sala = ${id}`);
  } catch (error) {
    console.error('Erro ao obter sala por ID:', error);
    throw error;
  }
};

const criarSalas = async (salasData) => {
  try {
    return await create('salas', salasData);
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    throw error;
  }
};     

const atualizarSalas = async (id, salasData) => {
  try {
    await update('salas', salasData, `id_sala = ${id}`);
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    throw error;
  }
};

const excluirSalas = async (id) => {
  try {
    await deleteRecord('salas', `id_sala = ${id}`);
  } catch (error) {
    console.error('Erro ao excluir sala:', error);
    throw error;
  }
};

export { listarSalas, obterSalasPorId, criarSalas, atualizarSalas, excluirSalas };