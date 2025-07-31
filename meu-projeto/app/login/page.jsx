import Link from "next/link";
import "./login.css";

export default function Login() {
  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.png" alt="Zelus Assistência Técnica" />
      </div>
      <h2>Entrar na Conta</h2>

      <form>
        <label htmlFor="email">Usuário</label>
        <input type="email" id="email" placeholder="Nome de usuário" required />

        <div className="password-wrapper">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Senha" required />
        </div>

        <button type="submit" className="login-btn">
          Entrar
        </button>

        <Link href="/esqueceuSenha" className="forgot">
          Esqueceu sua senha?
        </Link>

        <div className="signup-text">Ainda não tem uma conta?</div>

        <Link href="/cadastro" className="signup-btn">
          Criar conta
        </Link>
      </form>
    </div>
  );
}
