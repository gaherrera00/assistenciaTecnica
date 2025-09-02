import { read, compare } from "../config/database.js";
import { criarCadastro } from "../models/auth.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

const cadastro = async (req, res) => {
  const { nome, email, ra, senha, funcao } = req.body;
  try {
  //Validação do email
  const emailRegex = /^[\w.-]+@(gmail|hotmail|outlook|exemplo)\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: "O email é inválido. Por favor, use @gmail, @hotmail, @outlook ou @exemplo." });
  }

  const usuario = await read('usuarios', `email = '${email}'`);

  if (usuario) {
    return res.status(400).json({ mensagem: 'Email já cadastrado!' })
  }

  //Validação da função
  const verificarFuncao = ['aluno', 'tecnico', 'adm'];

  if (!verificarFuncao.includes(funcao)) {
    return res.status(400).json({ mensagem: 'Esta função não existe.' })
  }

  // Validação do RA
  let raFinal = null;

  if (funcao === 'aluno' || funcao === 'tecnico' || funcao === 'adm') {
    if (!ra) {
      return res.status(400).json({ mensagem: 'Aluno deve possuir um RA.' });
    }

    // RA deve conter exatamente 8 dígitos (incluindo zeros à esquerda)
    const raRegex = /^\d{8}$/;
    if (!raRegex.test(ra)) {
      return res.status(400).json({ mensagem: 'O RA deve conter exatamente 8 números.' });
    }

    // Verifica se RA já existe
    const usuarioComRa = await read('usuarios', `ra = '${ra}'`);
    if (usuarioComRa && usuarioComRa.length > 0) {
      return res.status(400).json({ mensagem: 'RA já cadastrado!' });
    }

    raFinal = ra; // mantém o RA como string com zeros à esquerda
  }
  
// Validação da senha
if (!senha || senha.length < 6 || senha.length > 8) {
  return res.status(400).json({ mensagem: 'A senha deve ter entre 6 e 8 caracteres.' });
}

// Verifica se contém pelo menos um número
if (!/\d/.test(senha)) {
  return res.status(400).json({ mensagem: 'A senha deve conter pelo menos um número.' });
}

  const cadastroData = {
    nome: nome,
    email: email, 
    ra: raFinal,
    senha: senha,
    funcao: funcao
  };
    
  const cadastroId = await criarCadastro(cadastroData);         
  res.status(201).json({ mensagem: 'Cadastro realizado com sucesso.', cadastroId });
  } catch (err) {
    console.error("Erro ao cadastrar usuario: ", err);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuario." });
  }
};

const loginController = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const usuario = await read("usuarios", `email = '${email}'`);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Verificar se a senha está correta (comparar a senha enviada com o hash armazenado)
    const senhaCorreta = await compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha ou email incorreto" });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        email: usuario.email,
        funcao: usuario.funcao,
        ra: usuario.ra,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Retornar dados do usuário (sem a senha) e o token
    const userData = {
      id: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      ra: usuario.ra,
      funcao: usuario.funcao,
      status: usuario.status,
    };

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro ao fazer login" });
  }
};

export { loginController, cadastro };
