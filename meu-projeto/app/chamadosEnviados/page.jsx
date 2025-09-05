"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function TabelaProblemas() {
  const [problemas, setProblemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [acceptingId, setAcceptingId] = useState(null);

  useEffect(() => {
    fetchChamados();
  }, []);

  const fetchChamados = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chamado`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProblemas(data);
      } else {
        setError("Erro ao carregar chamados");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const handleAceitarPedido = async (id) => {
    setAcceptingId(id);
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chamado/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ status: "aceito" }),
      });

      if (response.ok) {
        // Atualiza a lista local
        setProblemas(prev => 
          prev.map(p => 
            p.id === id ? { ...p, status: "aceito" } : p
          )
        );
      } else {
        alert("Erro ao aceitar chamado");
      }
    } catch (err) {
      alert("Erro de conexão");
    } finally {
      setAcceptingId(null);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <section className="mt-10 bg-gradient-to-r from-[#084438] to-green-700 py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            Carregando chamados...
          </div>
        </section>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <section className="mt-10 bg-gradient-to-r from-[#084438] to-green-700 py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-red-200">{error}</p>
            <button 
              onClick={fetchChamados}
              className="mt-4 px-4 py-2 bg-white text-green-800 rounded-lg hover:bg-gray-100"
            >
              Tentar novamente
            </button>
          </div>
        </section>
      </ProtectedRoute>
    );
  }

  if (problemas.length === 0) {
    return (
      <ProtectedRoute>
        <section className="mt-10 bg-gradient-to-r from-[#084438] to-green-700 py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            Nenhum chamado disponível
          </div>
        </section>
      </ProtectedRoute>
    );
  }

  // Pega dinamicamente as colunas que vieram da API
  const colunas = Object.keys(problemas[0]);

  return (
    <ProtectedRoute>
      <section className="mt-10 bg-gradient-to-r from-[#084438] to-green-700 py-12 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Tabela de Chamados
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-white/20 text-left">
              <thead className="bg-green-900 text-white sticky top-0">
                <tr>
                  {colunas.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-2 border border-white/20 break-words capitalize"
                    >
                      {col}
                    </th>
                  ))}
                  <th className="px-4 py-2 border border-white/20 text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {problemas.map((p) => (
                  <tr
                    key={p.id}
                    className="odd:bg-green-800 even:bg-green-700 hover:bg-green-600 transition-colors"
                  >
                    {colunas.map((col) => (
                      <td
                        key={col}
                        className="px-4 py-2 border border-white/20 break-words"
                      >
                        {p[col]}
                      </td>
                    ))}
                    <td className="px-4 py-2 border border-white/20 text-center">
                      <button
                        className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded transition disabled:opacity-50"
                        onClick={() => handleAceitarPedido(p.id)}
                        disabled={acceptingId === p.id || p.status === "aceito"}
                      >
                        {acceptingId === p.id ? "..." : p.status === "aceito" ? "✅" : "✅"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ProtectedRoute>
   );
}
