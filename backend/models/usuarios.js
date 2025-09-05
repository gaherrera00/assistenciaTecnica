import { readAll, read, create, deleteRecord } from '../config/database.js';
import { generateHashedPassword } from '../uteis/hashPassword.js';

export const listarUsuarios = async () => {
  try {
    return await readAll('usuarios');
  } catch (error) {
    console.error('Erro ao listar usuarios:', error);
    throw error;
  }
};

export const obterUsuarioPorId = async (id) => {
  try {
    return await read('usuarios', `id_usuario = ${id}`);
  } catch (error) {
    console.error('Erro ao obter usuario por ID:', error);
    throw error;
  }
};

export const criarUsuario = async (usuarioData) => {
  try {
        const hashedPassword = await generateHashedPassword(usuarioData.senha);
        const data = { ...usuarioData, senha: hashedPassword };
        usuarioData = data;
    return await create('usuarios', data);
  }
  catch (error) {
    console.error('Erro ao criar usuario:', error);
    throw error;
  }
};

export const excluirUsuario = async (id) => {
  try {
    await deleteRecord('usuarios', `id_usuario = ${id}`);
  } catch (error) {
    console.error('Erro ao excluir usuario:', error);
    throw error;
  }
};