import { create } from '../config/database.js';
import { generateHashedPassword } from '../uteis/hashPassword.js';

const criarCadastro = async (infoData) => {
  try {
    const hashedPassword = await generateHashedPassword(infoData.senha);
    const novoUsuario = { ...infoData, senha: hashedPassword };
    return await create('usuarios', novoUsuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuario:', error);
    throw error;
  }
}

export { criarCadastro };