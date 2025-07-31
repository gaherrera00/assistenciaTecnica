export default function Header() {
    return (
      <header className="bg-green-600 text-white shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wide">MeuSite</div>
          <ul className="flex space-x-8 text-base font-medium">
            <li className="hover:text-green-200 transition-colors duration-300 cursor-pointer">
              Home
            </li>
            <li className="hover:text-green-200 transition-colors duration-300 cursor-pointer">
              Sobre
            </li>
            <li className="hover:text-green-200 transition-colors duration-300 cursor-pointer">
              Cadastro
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  