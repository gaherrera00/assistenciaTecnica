import { create, readAll, read, update, deleteRecord } from '../config/database.js';

const listarPatrimonios = async () => {
  try {
    return await readAll('patrimonios');
  } catch (error) {
    console.error('Erro ao listar patrimonios:', error);
    throw error;
  }
};

const obterPatrimonioPorId = async (id) => {
  try {
    return await read('patrimonios', `id_patrimonios = ${id}`);
  } catch (error) {
    console.error('Erro ao obter patrimonio por ID:', error);
    throw error;
  }
};

const criarPatrimonio = async (patrimonioData) => {
  try {
    return await create('patrimonios', patrimonioData);
  } catch (error) {
    console.error('Erro ao criar patrimonio:', error);
    throw error;
  }
};     

const atualizarPatrimonio = async (id, patrimonioData) => {
  try {
    await update('patrimonios', patrimonioData, `id_patrimonios = ${id}`);
  } catch (error) {
    console.error('Erro ao atualizar patrimonio:', error);
    throw error;
  }
};

const excluirPatrimonio = async (id) => {
  try {
    await deleteRecord('patrimonios', `id_patrimonios = ${id}`);
  } catch (error) {
    console.error('Erro ao excluir patrimonio:', error);
    throw error;
  }
};

export { listarPatrimonios, obterPatrimonioPorId, criarPatrimonio, atualizarPatrimonio, excluirPatrimonio };