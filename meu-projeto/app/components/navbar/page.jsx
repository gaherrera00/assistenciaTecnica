export default function Header() {
    return (
      <header className="bg-blue-600 text-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">MeuSite</div>
          <ul className="flex space-x-6 text-sm font-medium">
            <li className="hover:text-blue-300 cursor-pointer transition">Home</li>
            <li className="hover:text-blue-300 cursor-pointer transition">Sobre</li>
            <li className="hover:text-blue-300 cursor-pointer transition">Cadastro</li>
          </ul>
        </nav>
      </header>
    );
  }
  