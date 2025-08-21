import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="Zelus Assistência Técnica"
            className="w-44 mx-auto"
          />
        </div>

        <h2 className="text-2xl font-medium text-gray-800 mb-5">
          Entrar na Conta
        </h2>

        <form className="flex flex-col gap-3">
          <label htmlFor="email" className="sr-only">
            Usuário
          </label>
          <input
            type="email"
            id="email"
            placeholder="Nome de usuário"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          />

          <div className="relative">
            <label htmlFor="senha" className="sr-only">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
            />
          </div>

          <button
            type="submit"
            className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors"
          >
            Entrar
          </button>

          <Link
            href="/esqueceuSenha"
            className="mt-2 text-xs text-green-700 underline cursor-pointer hover:text-green-600"
          >
            Esqueceu sua senha?
          </Link>
        </form>
      </div>
    </div>
  );
}
