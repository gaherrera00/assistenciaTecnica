"use client";
import { useState } from "react";

export default function ChamadosUser() {
  const [step, setStep] = useState(1); // controla a etapa do formulário
  const [previews, setPreviews] = useState([]);

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

  const handleFileChange = (e) => {
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
    setStep(2); // passa para o segundo formulário
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    // aqui você pode enviar os dados para a API
    console.log({ ...userData, ...chamadoData });
    alert("Chamado enviado com sucesso!");
    setStep(1); // opcional: volta para o início
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-17">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="Zelus Assistência Técnica"
            className="w-44 mx-auto"
          />
        </div>

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
              value={userData.sala}
              onChange={handleUserChange}
              placeholder="Ex.: 2D-6"
              required
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
            />

            <label className="text-gray-800 text-sm font-medium mb-1 block">
              RA
            </label>
            <input
              type="number"
              id="ra"
              value={userData.ra}
              onChange={handleUserChange}
              placeholder="Ex.: 12345678"
              required
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
              placeholder="Ex.: 2TD"
              required
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
            />

            <button
              type="submit"
              className="mt-4 p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors w-full"
            >
              Continuar para o chamado
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            className="flex flex-col gap-3 text-left"
            onSubmit={handleSubmitStep2}
          >
            {/* Botão de voltar */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mb-3 text-gray-700 hover:text-green-800 font-medium text-sm flex items-center"
            >
              &lt; Voltar
            </button>

            <h2 className="text-2xl font-medium text-gray-800 mb-3">
              Detalhes do Chamado
            </h2>

            <label className="text-gray-800 text-sm font-medium mb-1 block">
              ID da máquina
            </label>
            <input
              type="text"
              id="idMaquina"
              value={chamadoData.idMaquina}
              onChange={handleChamadoChange}
              placeholder="Ex.: ID12345"
              required
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
            />

            <label className="text-gray-800 text-sm font-medium mb-1 block">
              Sintoma principal
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

            {/* Upload múltiplo */}
            <input
              type="file"
              id="fotos"
              name="fotos"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fotos"
              className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors text-center"
            >
              Anexar imagens
            </label>

            {/* Miniaturas */}
            {previews.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 justify-center">
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Pré-visualização ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}

            <button
              type="submit"
              className="mt-4 p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors w-full"
            >
              Enviar Chamado
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
