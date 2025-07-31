import Link from "next/link";
import "./esqueceuSenha.css";
export default function EsqueceuSenha() {
  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.png" alt="Zelus Assistência Técnica" />
      </div>

      <h2>Recuperar Senha</h2>

      <form>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          required
        />

        <button type="submit" className="login-btn">
          Enviar link de recuperação
        </button>

        <div className="signup-text">Lembrou a senha?</div>

        <Link href="/login" className="signup-btn">
          Voltar ao login
        </Link>
      </form>
    </div>
  );
}
