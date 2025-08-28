"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser, logout } from '../../../utils/auth';
import { authAPI } from '../../../utils/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      logout();
      setUser(null);
      setLoading(false);
      router.push('/');
    }
  };

  return (
    <nav className="bg-gray-100 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#084438] font-family:'Roboto' ">Zelus</span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700 hidden md:block">
                Olá, {user.nome}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center disabled:opacity-50"
              >
                {loading ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          ) : (
            <a href="/login">
              <button
                type="button"
                className="text-white bg-[#084438] hover:bg-[#A8B8B5] hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-[#a8b8b5] font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Login
              </button>
            </a>
          )}
          {/* Botão de hambúguer para telas menores */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleMenu}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Abrir menu</span>
            {/* Ícone de hambúguer */}
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Menu de navegação */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'
            }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100 md:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-[#084438] rounded-sm md:bg-transparent md:text-[#084438] md:p-0 md:hover:text-[#A8B8B5]"
                aria-current="page"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/sobre"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A8B8B5] md:p-0"
              >
                Sobre
              </a>
            </li>
            {user && (
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A8B8B5] md:p-0"
                >
                  Dashboard
                </a>
              </li>
            )}
            <li>
              <a
                href="/formularioUser"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A8B8B5] md:p-0"
              >
                Chamados
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}