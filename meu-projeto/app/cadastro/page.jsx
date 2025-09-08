"use client";
import React from "react";

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Navbar fixa no topo */}
      <nav className="bg-dark-green fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo / título */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Meu Projeto
          </span>

          {/* Ícones de atalho */}
          <div className="flex items-center space-x-4 text-white">
            <i className="fas fa-home hover:text-light-green cursor-pointer transition"></i>
            <i className="fas fa-user hover:text-light-green cursor-pointer transition"></i>
            <i className="fas fa-cog hover:text-light-green cursor-pointer transition"></i>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-20">
          <h2 className="text-2xl font-semibold mb-4 text-dark-green">
            Bem-vindo ao React!
          </h2>
          <p className="text-gray-700 mb-4">
            Esse layout foi convertido de HTML puro para React mantendo as cores
            e classes originais.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="bg-accent-green hover:bg-dark-green text-white px-4 py-2 rounded-lg shadow transition flex items-center">
              <i className="fas fa-plus mr-2"></i>
              Adicionar
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition flex items-center">
              <i className="fas fa-trash mr-2"></i>
              Excluir
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
