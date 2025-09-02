"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI } from "../../utils/api";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    ra: "",
    funcao: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Só valida RA se for aluno
    if (formData.funcao === "aluno" && !/^\d{8}$/.test(formData.ra)) {
      setError("O RA deve conter exatamente 8 números.");
      return;
    }

    setLoading(true);

    try {
      const cadastroData = {
        ...formData,
        ra: formData.funcao === "aluno" ? parseInt(formData.ra) : null, // se não for aluno, não envia RA
      };

      await authAPI.cadastro(cadastroData);
      setSuccess("Cadastro realizado com sucesso! Redirecionando...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError(error.message || "Erro ao realizar cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-20">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="Zelus Assistência Técnica"
            className="w-44 mx-auto"
          />
        </div>

        <h2 className="text-2xl font-medium text-gray-800 mb-5">Criar Conta</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Nome completo */}
          <input
            type="text"
            id="nome"
            placeholder="Seu nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 text-black"
          />

          {/* E-mail */}
          <input
            type="email"
            id="email"
            placeholder="exemplo@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 text-black"
          />

          {/* RA (apenas se for aluno) */}
          {formData.funcao === "aluno" && (
            <input
              type="text"
              id="ra"
              placeholder="Seu RA (8 dígitos)"
              value={formData.ra}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 8) {
                  setFormData({ ...formData, ra: value });
                }
              }}
              required
              maxLength={8}
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 text-black"
            />
          )}

          {/* Senha */}
          <input
            type="password"
            id="senha"
            placeholder="Crie uma senha (6-8 caracteres)"
            value={formData.senha}
            onChange={handleChange}
            required
            minLength={6}
            maxLength={8}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 text-black"
          />

          {/* Função */}
          <select
            id="funcao"
            value={formData.funcao}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 text-black"
          >
            <option value="">Selecione sua função</option>
            <option value="aluno">Aluno</option>
            <option value="tecnico">Técnico</option>
            <option value="administrador">Administrador</option>
          </select>

          {/* Botão de cadastro */}
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <div className="mt-5 text-sm text-gray-600 tracking-tight">
            Já tem uma conta?
          </div>

          <Link href="/login">
            <button
              type="button"
              className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm cursor-pointer text-gray-600 hover:bg-gray-100 transition-colors w-full"
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
