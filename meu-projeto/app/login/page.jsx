"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o token e dados do usuário
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redireciona para o dashboard
        router.push("/dashboard");
      } else {
        setError(data.error || "Erro no login");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Login do Sistema
          </h2>
          <p className="mt-2 text-center text-sm text-green-100">
            Acesse com suas credenciais
          </p>
        </div>

        <h2 className="text-2xl font-medium text-gray-800 mb-5">
          Entrar na Conta
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label htmlFor="email" className="sr-only">
            RA
          </label>
          <input
            type="number"
            id="email"
            placeholder="RA"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          />

          <div className="relative">
            <label htmlFor="senha" className="sr-only">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setSenha(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
            />
          </div>

          {error && (
            <div className="text-red-200 text-center text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-green-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>

          <div className="text-center text-green-100 text-sm">
            <p className="font-semibold">Credenciais de teste:</p>
            <p>Admin: admin@exemplo.com / password</p>
            <p>Técnico: tecnico@exemplo.com / password</p>
            <p>Usuário: user@exemplo.com / password</p>
          </div>
        </form>
      </div>
    </div>
  );
}
