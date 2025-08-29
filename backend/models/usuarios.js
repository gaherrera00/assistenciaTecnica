import { readAll, read, create, update, deleteRecord } from '../config/database.js';

const listarUsuarios = async () => {
  try {
    return await readAll('usuarios');
  } catch (error) {
    console.error('Erro ao listar usuarios:', error);
    throw error;
  }
};

const obterUsuarioPorId = async (id) => {
  try {
    return await read('usuarios', `id_usuario = ${id}`);
  } catch (error) {
    console.error('Erro ao obter usuario por ID:', error);
    throw error;
  }
};

const excluirUsuario = async (id) => {
  try {
    await deleteRecord('usuarios', `id_usuario = ${id}`);
  } catch (error) {
    console.error('Erro ao excluir usuario:', error);
    throw error;
  }
};

export { listarUsuarios, obterUsuarioPorId, excluirUsuario };