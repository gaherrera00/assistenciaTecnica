"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ChamadosUser() {
  const [step, setStep] = useState(1); // controla a etapa do formulário
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const [userData, setUserData] = useState({
    nome: "",
    sala: "",
    ra: "",
    turma: "",
  });

  const [chamadoData, setChamadoData] = useState({
    idMaquina: "",
    sintoma: "",
    detalhes: "",
    inicio: "",
    frequencia: "",
    historico: "",
  });

  const FileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleChamadoChange = (e) => {
    setChamadoData({ ...chamadoData, [e.target.id]: e.target.value });
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();

    // Validação da sala
    const salaRegex = /^[0-2][A-D]-(?:[1-9])$/;
    if (!salaRegex.test(userData.sala)) {
      setError("A sala deve estar no formato correto (ex: 1B-9).");
      return;
    }

    // Validação do RA (8 dígitos)
    if (!/^\d{8}$/.test(userData.ra)) {
      setError("O RA deve conter exatamente 8 números.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Combina os dados do usuário com os dados do chamado
      const chamadoCompleto = {
        ...userData,
        ...chamadoData,
        status: "pendente",
        dataCriacao: new Date().toISOString(),
      };

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chamado`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(chamadoCompleto),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Chamado enviado com sucesso!");
        setTimeout(() => {
          setStep(1);
          setUserData({ nome: "", sala: "", ra: "", turma: "" });
          setChamadoData({
            idMaquina: "",
            sintoma: "",
            detalhes: "",
            inicio: "",
            frequencia: "",
            historico: "",
          });
          setPreviews([]);
        }, 2000);
      } else {
        setError(data.mensagem || "Erro ao enviar chamado");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-17">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="mb-6">
            <img
              src="/logo.png"
              alt="Zelus Assistência Técnica"
              className="w-44 mx-auto"
            />
          </div>

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

          {step === 1 && (
            <form
              className="flex flex-col gap-3 text-left"
              onSubmit={handleSubmitStep1}
            >
              <h2 className="text-2xl font-medium text-gray-800 mb-3">
                Faça seu chamado
              </h2>
              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Nome do usuário
              </label>
              <input
                type="text"
                id="nome"
                value={userData.nome}
                onChange={handleUserChange}
                placeholder="Nome completo do usuário"
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Sala
              </label>
              <input
                type="text"
                id="sala"
                placeholder="Ex: 1B-12"
                value={userData.sala}
                onChange={(e) => {
                  let value = e.target.value.toUpperCase();

                  // Permite só caracteres válidos (0–2, A–D, -, dígitos)
                  value = value.replace(/[^0-2A-D\-0-9]/gi, "");

                  setUserData({ ...userData, sala: value });
                }}
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                RA
              </label>
              <input
                type="text"
                id="ra"
                placeholder="Ex.: 12345678"
                value={userData.ra}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // só números
                  if (value.length <= 8) {
                    setUserData({ ...userData, ra: value });
                  }
                }}
                required
                maxLength={8}
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />
              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Turma
              </label>
              <input
                type="text"
                id="turma"
                value={userData.turma}
                onChange={handleUserChange}
                placeholder="Ex.: 2D-6"
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />

              <button
                type="submit"
                className="mt-4 p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors w-full"
              >
                Próximo
              </button>
            </form>
          )}

          {step === 2 && (
            <form
              className="flex flex-col gap-3 text-left"
              onSubmit={handleSubmitStep2}
            >
              <h2 className="text-2xl font-medium text-gray-800 mb-3">
                Detalhes do Problema
              </h2>

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                ID da Máquina
              </label>
              <input
                type="text"
                id="idMaquina"
                value={chamadoData.idMaquina}
                onChange={handleChamadoChange}
                placeholder="Ex.: PC-001, LAB-2-05"
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Sintoma / Problema
              </label>
              <input
                type="text"
                id="sintoma"
                value={chamadoData.sintoma}
                onChange={handleChamadoChange}
                placeholder="Ex.: Não liga, tela preta, travando"
                required
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Detalhes adicionais
              </label>
              <textarea
                id="detalhes"
                value={chamadoData.detalhes}
                onChange={handleChamadoChange}
                placeholder="Ex.: Ruídos, mensagens de erro, cheiro de queimado, superaquecimento"
                rows={3}
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black resize-none"
              />

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Início / Há quanto tempo
              </label>
              <input
                type="text"
                id="inicio"
                value={chamadoData.inicio}
                onChange={handleChamadoChange}
                placeholder="Ex.: Começou ontem, há 2 dias, após atualização"
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Frequência / Condições
              </label>
              <input
                type="text"
                id="frequencia"
                value={chamadoData.frequencia}
                onChange={handleChamadoChange}
                placeholder="Ex.: Ocorre sempre, só ao ligar, durante uso intenso"
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
              />

              <label className="text-gray-800 text-sm font-medium mb-1 block">
                Histórico / Possível causa
              </label>
              <textarea
                id="historico"
                value={chamadoData.historico}
                onChange={handleChamadoChange}
                placeholder="Ex.: Tentativas de conserto anteriores, suspeita do cliente sobre a causa"
                rows={3}
                className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando..." : "Enviar Chamado"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-2 p-3 bg-gray-500 text-white border-none rounded-lg text-base cursor-pointer hover:bg-gray-700 transition-colors w-full"
              >
                Voltar
              </button>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
