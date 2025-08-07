"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.getElementById(hash.replace("#", ""));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Zelus Assistência Técnica</h1>
        <p className="text-lg text-gray-700">
          Soluções rápidas para seus problemas técnicos
        </p>
        <img
          src="/logo.png"
          alt="Zelus Assistência Técnica"
          className="mx-auto mt-6 w-32 h-32 object-contain drop-shadow-lg"
        />
      </header>

      {/* Navegação rápida */}
      <nav className="flex justify-center space-x-6 mb-12">
        <a
          href="#hardware"
          className="text-emerald-700 hover:underline font-medium"
        >
          Hardware
        </a>
        <a
          href="#windows"
          className="text-emerald-700 hover:underline font-medium"
        >
          Windows
        </a>
        <a
          href="#linux"
          className="text-emerald-700 hover:underline font-medium"
        >
          Linux
        </a>
      </nav>

      <div className="space-y-16">
        {/* Hardware */}
        <section id="hardware">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-emerald-600">
            Problemas Comuns de Hardware
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Computador não liga</h3>
              <p className="text-gray-700 mt-2">
                Verifique se o cabo de energia está conectado corretamente e se
                a fonte está ligada.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Tela preta ao iniciar</h3>
              <p className="text-gray-700 mt-2">
                Teste com outro monitor ou cabo. Pode ser problema na GPU ou
                memória RAM.
              </p>
            </div>
          </div>
        </section>

        {/* Windows */}
        <section id="windows">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-emerald-600">
            Problemas Comuns no Windows
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Windows lento</h3>
              <p className="text-gray-700 mt-2">
                Verifique programas iniciando com o sistema, desinstale o que
                não usa e faça uma limpeza de disco.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Atualizações travadas</h3>
              <p className="text-gray-700 mt-2">
                Tente reiniciar o computador e execute o solucionador de
                problemas do Windows Update.
              </p>
            </div>
          </div>
        </section>

        {/* Linux */}
        <section id="linux">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-emerald-600">
            Problemas Comuns no Linux
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Sistema não inicializa</h3>
              <p className="text-gray-700 mt-2">
                Verifique se o GRUB está configurado corretamente e use um live
                CD para recuperação.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Wi-Fi não conecta</h3>
              <p className="text-gray-700 mt-2">
                Certifique-se de que o driver da placa esteja instalado. Tente
                comandos como `lspci` e `modprobe`.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
