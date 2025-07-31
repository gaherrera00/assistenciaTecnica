import "./login.css";

export default function Login() {
  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.png" alt="Zelus Assistência Técnica" />
      </div>
      <h2>Entrar na Conta</h2>

      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Endereço de email"
          required
        />

        <div className="password-wrapper">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Senha" required />
        </div>

        <button type="submit" className="login-btn">
          Entrar
        </button>

        <div className="forgot">Esqueceu sua senha?</div>

        <div className="signup-text">Ainda não tem uma conta?</div>

        <button type="button" className="signup-btn">
          Criar conta
        </button>
      </form>
    </div>
  );
}
