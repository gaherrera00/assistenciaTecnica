"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI } from "../../utils/api";
import { setAuthToken, setUser } from "../../utils/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(formData);
      
      if (response.token) {
        setAuthToken(response.token);
        setUser(response.user || { email: formData.email });
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="Zelus Assistência Técnica"
            className="w-44 mx-auto"
          />
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
            Usuário
          </label>
          <input
            type="email"
            id="email"
            placeholder="Nome de usuário"
            value={formData.email}
            onChange={handleChange}
            required
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
              value={formData.senha}
              onChange={handleChange}
              required
<<<<<<< Updated upstream
=======
              value={password}
              onChange={(e) => setPassword(e.target.value)}
>>>>>>> Stashed changes
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <Link
            href="/esqueceuSenha"
            className="mt-2 text-xs text-green-700 underline cursor-pointer hover:text-green-600"
          >
            Esqueceu sua senha?
          </Link>

          <div className="mt-5 text-sm text-gray-600 tracking-tight">
            Ainda não tem uma conta?
          </div>

          <Link
            href="/cadastro"
            className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm cursor-pointer text-black hover:bg-gray-100 transition-colors inline-block"
          >
            Criar conta
          </Link>
        </form>
      </div>
    </div>
  );
}
