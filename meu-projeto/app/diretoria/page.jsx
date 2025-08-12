"use client";

import { useState } from "react";
import { gerarCodigo } from "../../utils/gerarCodigo";

export default function Diretoria() {
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [codigo, setCodigo] = useState("");

  function handleGerar(e) {
    e.preventDefault();
    if (!nome.trim() || !funcao) {
      alert("Preencha nome e função para gerar o código.");
      return;
    }
    const novoCodigo = gerarCodigo(nome, funcao);
    setCodigo(novoCodigo);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-medium text-gray-800 mb-5">
          Gerador de Código - Diretoria
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleGerar}>
          <label htmlFor="nome" className="sr-only">
            Nome Completo
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Digite o nome completo"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          />

          <label htmlFor="funcao" className="sr-only">
            Função
          </label>
          <select
            id="funcao"
            required
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          >
            <option value="">Selecione uma função</option>
            <option value="tecnico">Técnico</option>
            <option value="gerente">Gerente</option>
            <option value="cliente">Cliente</option>
          </select>

          <button
            type="submit"
            className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors"
          >
            Gerar Código
          </button>
        </form>

        {codigo && (
          <p className="mt-5 text-lg text-green-900 font-semibold">
            Código gerado: <span className="font-mono">{codigo}</span>
          </p>
        )}
      </div>
    </div>
  );
}
