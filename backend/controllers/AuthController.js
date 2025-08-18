import { read, compare } from '../config/database.js';
import { criarCadastro } from '../models/auth.js';
import jwt from 'jsonwebtoken';

const cadastro = async (req, res) => {
  const { email, senha, funcao } = req.body;
  try {
    const usuario = await read('usuario', `email = '${email}'`);

    if (usuario) {
      return res.status(400).json({ mensagem: 'Email já cadastrado!' })
    }

    // Validação da senha
    if (senha.length < 6 || senha.length > 8) {
      return res.status(400).json({ mensagem: 'A senha deve ter entre 6 e 8 caracteres.' });
    }

    let temNumero = false;
    for (let i = 0; i < senha.length; i++) {
      if (!isNaN(senha[i]) && senha[i] !== ' ') {
        temNumero = true;
        break;
      }
    }
    if (!temNumero) {
      return res.status(400).json({ mensagem: 'A senha deve conter pelo menos um número.' });
    }

    const verificarFuncao = ['aluno', 'tecnico', 'gerente'];

    if (!verificarFuncao.includes(funcao)) {
      return res.status(400).json({ mensagem: 'Esta função não existe.' })
    }

    const cadastroData = {
      email: email, 
      senha: senha,
      funcao: funcao
    };

    const cadastroId = await criarCadastro(cadastroData);         
    res.status(201).josn({ mensagem: 'Cadastro realizado com sucesso.', cadastroId });
  } catch (err) {
    console.error('Erro ao cadastrar usuario: ', err);
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuario.' });
  }
}

const loginController = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const usuario = await read('usuarios', `email = '${email}'`);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta (comparar a senha enviada com o hash armazenado)
    const senhaCorreta = await compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha ou email incorreto' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: usuario.id_usuario, tipo: usuario.tipo }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};

export { loginController };