export default function Header() {
  return (
    <header className="bg-[#084438] text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wide text-white">
          MeuSite
        </div>
        <ul className="flex space-x-8 text-base font-medium">
          <li>
            <span className="hover:text-[#1b806b] transition-colors duration-300 cursor-pointer text-white block">
              Home
            </span>
          </li>
          <li>
            <span className="hover:text-[#1b806b] transition-colors duration-300 cursor-pointer text-white block">
              Sobre
            </span>
          </li>
          <li>
            <span className="hover:text-[#1b806b] transition-colors duration-300 cursor-pointer text-white block">
              Cadastro
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
