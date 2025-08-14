"use client";
import { useEffect, useState } from "react";

export default function TabelaProblemas() {
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    fetch("/api/problemas")
      .then((res) => res.json())
      .then((data) => setProblemas(data));
  }, []);

  const handleAceitarPedido = (id) => {
    // Função para aceitar o pedido (implementar envio para API)
    console.log("Aceito pedido ID:", id);
  };

  return (
    <section className="mt-10 bg-gradient-to-r from-[#084438] to-green-700 py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Tabela de Chamados
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/20 text-left">
            <thead className="bg-green-900 text-white sticky top-0">
              <tr>
                <th className="px-4 py-2 border border-white/20 break-words">
                  Sintoma principal
                </th>
                <th className="px-4 py-2 border border-white/20 break-words">
                  Detalhes adicionais
                </th>
                <th className="px-4 py-2 border border-white/20 break-words">
                  Início / Há quanto tempo
                </th>
                <th className="px-4 py-2 border border-white/20 break-words">
                  Frequência / Condições
                </th>
                <th className="px-4 py-2 border border-white/20 break-words">
                  Histórico / Possível causa
                </th>
                <th className="px-4 py-2 border border-white/20 text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {problemas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-200">
                    Nenhum chamado disponível
                  </td>
                </tr>
              ) : (
                problemas.map((p) => (
                  <tr
                    key={p.id}
                    className="odd:bg-green-800 even:bg-green-700 hover:bg-green-600 transition-colors"
                  >
                    <td className="px-4 py-2 border border-white/20 break-words">
                      {p.sintoma}
                    </td>
                    <td className="px-4 py-2 border border-white/20 break-words">
                      {p.detalhes}
                    </td>
                    <td className="px-4 py-2 border border-white/20 break-words">
                      {p.inicio}
                    </td>
                    <td className="px-4 py-2 border border-white/20 break-words">
                      {p.frequencia}
                    </td>
                    <td className="px-4 py-2 border border-white/20 break-words">
                      {p.historico}
                    </td>
                    <td className="px-4 py-2 border border-white/20 text-center">
                      <button
                        className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded transition"
                        onClick={() => handleAceitarPedido(p.id)}
                      >
                        ✅
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
