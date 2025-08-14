// pages/404.tsx
import Link from "next/link";
import Image from "next/image";

export default function Custom404() {
  return (
    <main className="bg-secondary min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="mx-auto w-40 h-40 relative mb-6">
          <Image
            src="/deslike.png"
            alt="Página não encontrada"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-lg text-black mb-10">
          Oops! Página não encontrada.
        </p>

        <Link
          href="/"
          className="bg-gradient-to-r from-[#084438] to-green-700 text-white px-6 py-3 rounded-xl hover:bg-[#084438] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#11703B] focus:ring-offset-2"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </main>
  );
}
