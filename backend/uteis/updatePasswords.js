import { read, update } from '../config/database.js';
import { generateHashedPassword } from './hashPassword.js';

async function updateExistingPasswords() {
  try {
    console.log('Atualizando senhas existentes...');
    
    // Buscar todos os usuários
    const usuarios = await read('usuarios', '1=1');
    
    if (!usuarios) {
      console.log('Nenhum usuário encontrado');
      return;
    }
    
  
    for (const usuario of usuarios) {
      const senhaHash = await generateHashedPassword('senha123'); // Senha padrão
      
      await update('usuarios', 
        { senha: senhaHash }, 
        `id_usuario = ${usuario.id_usuario}`
      );
      
      console.log(`Usuário ${usuario.nome} atualizado com senha: senha123`);
    }
    
    console.log('Todas as senhas foram atualizadas para: senha123');
    
  } catch (error) {
    console.error('Erro ao atualizar senhas:', error);
  }
}

updateExistingPasswords();
