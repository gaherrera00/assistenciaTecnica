import Link from "next/link";

export default function EsqueceuSenha() {
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
          Recuperar Senha
        </h2>

        <form className="flex flex-col gap-3">
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
          />

          <button
            type="submit"
            className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors"
          >
            Enviar link de recuperação
          </button>

          <div className="mt-5 text-sm text-gray-600 tracking-tight">
            Lembrou a senha?
          </div>

          <Link
            href="/login"
            className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm cursor-pointer text-gray-600 hover:bg-gray-100 transition-colors w-full"
          >
            Voltar ao login
          </Link>
        </form>
      </div>
    </div>
  );
}
