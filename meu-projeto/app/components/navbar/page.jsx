"use client";
import React, { useState } from "react";
import { Users, ClipboardList, Ticket, Info, LogOut, Menu, X, Home, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-green-900 text-white fixed w-full z-50 top-0 left-0 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Nome do projeto */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold">Zelus</span>
          </div>

          {/* Menu desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link href="/" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-green-800 transition-colors">
              <Home className="w-5 h-5" /> Início
            </Link>
            <Link href="/dashboard" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-green-800 transition-colors">
              <ClipboardList className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/gerenUser" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-green-800 transition-colors">
              <Users className="w-5 h-5" /> Gerenciar Usuários
            </Link>
            <Link href="/chamadosEnviados" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-green-800 transition-colors">
              <Ticket className="w-5 h-5" /> Chamados Enviados
            </Link>
            <Link href="/apontamentos" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-green-800 transition-colors">
              <FileText className="w-5 h-5" /> Apontamentos
            </Link>
            <Link href="/sobre" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-green-800 transition-colors">
              <Info className="w-5 h-5" /> Sobre
            </Link>
          </div>

          {/* Perfil e logout desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            <Link
              href="/perfil"
              className="flex items-center gap-1 px-3 py-2 rounded bg-green-700 hover:bg-green-600 transition-colors"
            >
              <Info className="w-5 h-5" /> {user?.name || "Usuário"}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 rounded bg-red-700 hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Sair
            </button>
          </div>

          {/* Botão mobile */}
          <div className="flex lg:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="lg:hidden bg-green-900 text-white">
          <Link href="/" className="block px-4 py-2 hover:bg-green-800 transition-colors">Início</Link>
          <Link href="/dashboard" className="block px-4 py-2 hover:bg-green-800 transition-colors">Dashboard</Link>
          <Link href="/gerenUser" className="block px-4 py-2 hover:bg-green-800 transition-colors">Gerenciar Usuários</Link>
          <Link href="/chamadosEnviados" className="block px-4 py-2 hover:bg-green-800 transition-colors">Chamados Enviados</Link>
          <Link href="/apontamentos" className="block px-4 py-2 hover:bg-green-800 transition-colors">Apontamentos</Link>
          <Link href="/sobre" className="block px-4 py-2 hover:bg-green-800 transition-colors">Sobre</Link>
          <Link href="/perfil" className="block px-4 py-2 mt-2 bg-green-700 hover:bg-green-600 rounded transition-colors">
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 mt-1 bg-red-700 hover:bg-red-600 rounded transition-colors"
          >
            Sair
          </button>
        </div>
      )}
    </nav>
  );
}

// Layout principal ajustado para navbar
export function Layout({ user, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <main className="flex-1 bg-gray-50 pt-16">
        {/* pt-16 = altura da navbar fixa */}
        <div className="max-w-7xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
