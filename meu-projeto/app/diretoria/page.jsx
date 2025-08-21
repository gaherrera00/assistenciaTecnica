"use client";

import { useState } from "react";
import { gerarRA, gerarSenha } from "../../utils/gerarCodigo.js";

export default function Diretoria() {
  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [aluno, setAluno] = useState(null);

  function gerarEmail(nomeCompleto) {
    const nomes = nomeCompleto.trim().split(" ");
    const primeiro = nomes[0].toLowerCase();
    const ultimo = nomes[nomes.length - 1].toLowerCase();
    return `${primeiro}.${ultimo}@aluno.senai@gmail.com`;
  }

  function handleGerar(e) {
    e.preventDefault();
    if (!nome.trim() || !dataInicio || !dataFim) {
      alert("Preencha todos os campos para gerar os dados do aluno.");
      return;
    }

    const ra = gerarRA(nome, dataInicio, dataFim);
    const email = gerarEmail(nome);
    const senha = gerarSenha(6);

    setAluno({ ra, email, senha });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Gerador de Dados do Aluno
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleGerar}>
          {/* Nome */}
          <div className="flex flex-col">
            <label htmlFor="nome" className="mb-1 text-gray-600 font-medium">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl shadow-sm text-sm w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>

          {/* Data de início */}
          <div className="flex flex-col">
            <label
              htmlFor="dataInicio"
              className="mb-1 text-gray-600 font-medium"
            >
              Data de início
            </label>
            <input
              id="dataInicio"
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl shadow-sm text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>

          {/* Data de fim */}
          <div className="flex flex-col">
            <label htmlFor="dataFim" className="mb-1 text-gray-600 font-medium">
              Data de fim
            </label>
            <input
              id="dataFim"
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl shadow-sm text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="p-3 bg-green-900 text-white rounded-xl font-semibold text-base hover:bg-green-800 transition-colors shadow-md mt-2"
          >
            Gerar Dados
          </button>
        </form>

        {aluno && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-700 p-4 rounded-lg shadow-inner text-gray-800 font-medium space-y-2">
            <p>
              <span className="font-bold">RA:</span>{" "}
              <span className="font-mono text-green-900">{aluno.ra}</span>
            </p>
            <p>
              <span className="font-bold">E-mail:</span>{" "}
              <span className="font-mono text-green-900">{aluno.email}</span>
            </p>
            <p>
              <span className="font-bold">Senha:</span>{" "}
              <span className="font-mono text-green-900">{aluno.senha}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
