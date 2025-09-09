"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Apontamentos() {
  const [formData, setFormData] = useState({
    idChamado: "",
    ra: "",
    comeco: "",
    fim: "",
    descricao: "",
    status: "em_andamento"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apontamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Apontamento criado com sucesso!");
        setFormData({
          idChamado: "",
          ra: "",
          comeco: "",
          fim: "",
          descricao: "",
          status: "em_andamento"
        });
      } else {
        setError(data.mensagem || "Erro ao criar apontamento");
      }
    } catch (err) {
      console.error("Erro de conexão:", err); // 👈 vai mostrar no console o erro real
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="mb-6 text-center">
            <img
              src="/logo.png"
              alt="Zelus Assistência Técnica"
              className="w-44 mx-auto"
            />
          </div>

          <h2 className="text-2xl font-medium text-gray-800 mb-5 text-center">
            Criar Apontamento
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="idChamado" className="block text-sm font-medium text-gray-700 mb-1">
                ID do Chamado
              </label>
              <input
                type="number"
                id="idChamado"
                name="idChamado"
                value={formData.idChamado}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="ra" className="block text-sm font-medium text-gray-700 mb-1">
                RA do Técnico
              </label>
              <input
                type="text"
                id="ra"
                name="ra"
                value={formData.ra}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="comeco" className="block text-sm font-medium text-gray-700 mb-1">
                Início
              </label>
              <input
                type="datetime-local"
                id="comeco"
                name="comeco"
                value={formData.comeco}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="fim" className="block text-sm font-medium text-gray-700 mb-1">
                Fim
              </label>
              <input
                type="datetime-local"
                id="fim"
                name="fim"
                value={formData.fim}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent resize-none"
                placeholder="Descreva o trabalho realizado..."
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
              >
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
                <option value="pausado">Pausado</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando..." : "Criar Apontamento"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
