export default function Header() {
    return (
      <header className="bg-[#084438] text-white shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wide">MeuSite</div>
          <ul className="flex space-x-8 text-base font-medium">
            <li className="hover:text-green-200 transition-colors duration-300 cursor-pointer text-white">
              Home
            </li>
            <li className="hover:text-green-200 transition-colors duration-300 cursor-pointer text-white">
              Sobre
            </li>
            <li className="hover:text-green-200 transition-colors duration-300 cursor-pointer text-white">
              Cadastro
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  