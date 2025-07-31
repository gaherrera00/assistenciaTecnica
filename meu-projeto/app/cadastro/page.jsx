import Link from "next/link";
import "./cadastro.css";

export default function Cadastro() {
  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.png" alt="Zelus Assistência Técnica" />
      </div>

      <h2>Criar Conta</h2>

      <form>
        {/* Nome completo */}
        <label htmlFor="nome">Nome Completo</label>
        <input type="text" id="nome" placeholder="Seu nome completo" required />

        {/* E-mail */}
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="exemplo@email.com"
          required
        />

        {/* Senha */}
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          placeholder="Crie uma senha"
          required
        />

        {/* Função */}
        <label htmlFor="funcao">Função</label>
        <input
          type="text"
          id="funcao"
          placeholder="Ex: Técnico, Gerente, Cliente"
          required
        />

        {/* Botão de cadastro */}
        <button type="submit" className="login-btn">
          Cadastrar
        </button>

        <div className="signup-text">Já tem uma conta?</div>
        <Link href="/login">
          <button type="button" className="signup-btn">
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}
