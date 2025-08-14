import { read, compare } from '../config/database.js';

const cadastro = async (req, res) => {
  const { email, senha, funcao } = req.body;
  try {
    const usuario = await read('usuario', `email = ${email}`);

    if (usuario) {
      return res.status(404).json({ mensagem: 'Email já cadastrado!' })
    }

    const verificarFuncao = { aluno, tecnico, gerente};

    if (!verificarFuncao) {
      return res.status(404).json({ mensagem: 'Esta função não existe.' })
    }

    const cadastroData = {
      email: email, 
      senha: senha,
      funcao: funcao
    };

    function validarSenha(senha) {
      if (senha.lenght <= 6 || senha.lenght >= 8) {
        return res.status(400).json({ mensagem: 'A senha deve ter no minímo 6 e no maximo 8 caracteres.' });
      }

      let temNumero = false;
      const caracteres = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      for (let i = 0; i < senha.lenght; i++) {
        if (!isNaN (senha[i]) && senha[i] != ' ') {
          temNumero = true;
          break;
        }
      }
    }
  } catch (err) {

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
    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};

export { loginController };