"use client";

import { useState } from "react";
import Head from "next/head";
import {
  Ticket,
  Users,
  Wrench,
  ClipboardList,
  Mail,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula processo de login
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Zelos - Login</title>
        <meta
          name="description"
          content="Plataforma de Gerenciamento de Chamados SENAI"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex font-inter">
        {/* Lado Esquerdo - Branding e Funcionalidades */}
        <div className="hidden lg:flex lg:w-1/2 bg-green-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900"></div>

          {/* Elementos Decorativos */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-sky-400/20 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-20 h-20 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-sky-400/25 rounded-full"></div>

          <div className="relative z-10 flex flex-col justify-center items-start px-16 py-20">
            <div className="mb-12">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Ticket className="text-green-700 text-xl" />
                </div>
                <div>
                  <h1 className="text-white text-3xl font-bold">Zelos</h1>
                  <p className="text-green-200 text-sm">
                    Plataforma de Chamados SENAI
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Gerenciamento de Usuários */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Gerenciamento de Usuários
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Cadastre alunos e técnicos, organize permissões e controle
                    o acesso ao sistema de chamados.
                  </p>
                </div>
              </div>

              {/* Abertura de Chamados */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Ticket className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Abertura de Chamados
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Alunos registram solicitações para consertar equipamentos ou
                    objetos do SENAI.
                  </p>
                </div>
              </div>

              {/* Atendimento Técnico */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Atendimento Técnico
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Técnicos recebem e aceitam chamados para iniciar o
                    atendimento.
                  </p>
                </div>
              </div>

              {/* Apontamentos Técnicos */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Apontamentos Técnicos
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Registre observações, diagnósticos e andamento do chamado
                    durante o processo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário de Login */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Logo Mobile */}
            <div className="lg:hidden flex justify-center items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                  <Ticket className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-green-700 text-2xl font-bold">Zelos</h1>
                  <p className="text-gray-500 text-xs">
                    Plataforma de Chamados SENAI
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-gray-900 text-2xl font-semibold mb-2">
                Bem-vindo de volta
              </h2>
              <p className="text-gray-600 text-sm">
                Faça login para acessar o painel de chamados
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Endereço de e-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-500"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Mail className="text-gray-400 text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePassword}
                  >
                    {passwordVisible ? (
                      <Eye className="text-gray-400 text-sm hover:text-gray-600 transition duration-200" />
                    ) : (
                      <EyeOff className="text-gray-400 text-sm hover:text-gray-600 transition duration-200" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
