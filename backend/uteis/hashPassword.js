import bcrypt from 'bcryptjs';

async function generateHashedPassword(senha) {
  try {
    // Gerar o salt
    const salt = await bcrypt.genSalt(10);

    // Hashear a senha com o salt
    const hashedPassword = await bcrypt.hash(senha, salt);

    return hashedPassword
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    process.exit(1); // Encerra o processo com código de erro
  }
}

export { generateHashedPassword };