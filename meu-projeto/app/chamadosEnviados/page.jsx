"use client";
import { useEffect, useState } from "react";

export default function TabelaProblemas() {
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    fetch("/api/problemas")
      .then((res) => res.json())
      .then((data) => setProblemas(data));
  }, []);
  return (
    <section className="mt-30 bg-gradient-to-r from-[#084438] to-green-700 py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Tabela de Exemplo
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/30 text-center">
            <thead className="bg-secondary text-black">
              <tr>
                <th className="px-4 py-2 border border-white/30">
                  Sintoma principal
                  {/*o defeito mais evidente (ex.: não liga, tela preta)*/}
                </th>
                <th className="px-4 py-2 border border-white/30">
                  Detalhes adicionais
                  {/*ruídos, mensagens de erro, cheiros, superaquecimento*/}
                </th>
                <th className="px-4 py-2 border border-white/30">
                  Início / Há quanto tempo{/*quando o problema começou*/}
                </th>
                <th className="px-4 py-2 border border-white/30">
                  Frequência / Condições
                  {/*se ocorre sempre, intermitente, ou em situações específicas*/}
                </th>
                <th className="px-4 py-2 border border-white/30">
                  Histórico / Possível causa
                  {/*tentativas de conserto anteriores e suspeita do cliente sobre a causa*/}
                </th>
              </tr>
            </thead>
            <tbody>
              {problemas.map((p) => (
                <tr key={p.id} className="hover:bg-white/10 transition">
                  <td className="px-4 py-2 border border-white/30">
                    {p.sintoma}
                  </td>
                  <td className="px-4 py-2 border border-white/30">
                    {p.detalhes}
                  </td>
                  <td className="px-4 py-2 border border-white/30">
                    {p.inicio}
                  </td>
                  <td className="px-4 py-2 border border-white/30">
                    {p.frequencia}
                  </td>
                  <td className="px-4 py-2 border border-white/30">
                    {p.historico}
                  </td>
                  {/*aceitar o problema*/}
                  <td className="px-4 py-2 border border-white/30 text-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                      onClick={() => handleAceitarPedido(p.id)}
                    >
                      ✅
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
