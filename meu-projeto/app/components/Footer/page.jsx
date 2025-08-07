export default function Footer() {
  return (
    <footer className="bg-[#084438] text-white mt-10">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-lg font-semibold tracking-wide mb-4 md:mb-0">
          © 2025 MeuSite. Todos os direitos reservados.
        </div>
        <ul className="flex space-x-6 text-base font-medium">
          <li>
            <span className="hover:text-[#1b806b] transition-colors duration-300 cursor-pointer text-white block">
              Política de Privacidade
            </span>
          </li>
          <li>
            <span className="hover:text-[#1b806b] transition-colors duration-300 cursor-pointer text-white block">
              Termos de Uso
            </span>
          </li>
          <li>
            <span className="hover:text-[#1b806b] transition-colors duration-300 cursor-pointer text-white block">
              Contato
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
