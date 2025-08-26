"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gerarRA } from "../../utils/gerarCodigo";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [funcao, setFuncao] = useState("");
  const [ra, setRa] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  function handleFuncaoChange(e) {
    const val = e.target.value;
    setFuncao(val);

    // Se for cliente, gera o RA automaticamente baseado no email
    if (val === "cliente" && email) {
      const raGerado = gerarRA(email);
      setRa(raGerado);
    } else {
      setRa("");
    }
  }

  function handleEmailChange(e) {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Se for cliente e já tiver email, atualiza o RA
    if (funcao === "cliente" && emailValue) {
      const raGerado = gerarRA(emailValue);
      setRa(raGerado);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Se for cliente, gera o RA se ainda não foi gerado
    if (funcao === "cliente" && !ra && email) {
      const raGerado = gerarRA(email);
      setRa(raGerado);
    }

    try {
      const userData = {
        nome,
        email,
        senha,
        funcao,
        ...(funcao === "cliente" && { ra })
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.mensagem || "Erro ao realizar cadastro");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

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
          <label htmlFor="nome" className="sr-only">
            Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            placeholder="Seu nome completo"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          />

          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            placeholder="exemplo@email.com"
            required
            value={email}
            onChange={handleEmailChange}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          />

          <label htmlFor="senha" className="sr-only">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            placeholder="Crie uma senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          />

          <label htmlFor="funcao" className="sr-only">
            Função
          </label>
          <select
            id="funcao"
            required
            value={funcao}
            onChange={handleFuncaoChange}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          >
            <option value="">Selecione uma função</option>
            <option value="tecnico">Técnico</option>
            <option value="gerente">Gerente</option>
            <option value="cliente">Cliente</option>
          </select>

          {funcao === "cliente" && ra && (
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
              <strong>RA Gerado:</strong> {ra}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <Link
            href="/login"
            className="mt-2 text-xs text-green-700 underline cursor-pointer hover:text-green-600"
          >
            Já tem uma conta? Faça login
          </Link>
        </form>
      </div>
    </div>
  );
}
