"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { Plus, Clock, CheckCircle, PauseCircle, User, Calendar, FileText, AlertCircle } from "lucide-react";

export default function Apontamentos() {
  const [apontamentos, setApontamentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ descricao: "" });
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);

  // Carregar dados do usuário
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  // Carregar apontamentos
  const fetchApontamentos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apontamentos`, {
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      
      if (res.ok) {
        const data = await res.json();
        setApontamentos(data);
      } else {
        setError("Erro ao carregar apontamentos");
      }
    } catch (err) {
      console.error("Erro ao carregar apontamentos:", err);
      setError("Erro de conexão ao carregar apontamentos");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchApontamentos();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.descricao.trim()) {
      setError("A descrição é obrigatória");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apontamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Apontamento criado com sucesso!");
        setFormData({ descricao: "" });
        setShowForm(false);
        await fetchApontamentos(); // Recarregar lista
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.mensagem || "Erro ao criar apontamento");
      }
    } catch (err) {
      console.error("Erro ao criar apontamento:", err);
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "concluido": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pausado": return <PauseCircle className="w-5 h-5 text-yellow-600" />;
      case "em_andamento": return <Clock className="w-5 h-5 text-blue-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "concluido": return "Concluído";
      case "pausado": return "Pausado";
      case "em_andamento": return "Em Andamento";
      default: return status || "Indefinido";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "concluido": return "bg-green-100 text-green-800";
      case "pausado": return "bg-yellow-100 text-yellow-800";
      case "em_andamento": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada";
    try {
      return new Date(dateString).toLocaleString("pt-BR");
    } catch {
      return "Data inválida";
    }
  };

  return (
    <ProtectedRoute>
      <Layout user={user}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apontamentos</h1>
              <p className="text-gray-600 mt-2">
                Visualize e crie apontamentos de chamados técnicos
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              {showForm ? "Cancelar" : "Novo Apontamento"}
            </button>
          </div>

          {/* Mensagens */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Formulário */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border animate-in slide-in-from-top duration-200">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-green-700" />
                <h2 className="text-xl font-semibold text-gray-900">Criar Novo Apontamento</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição do Apontamento *
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                    placeholder="Descreva detalhadamente o trabalho realizado, problemas encontrados, soluções aplicadas..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo de 10 caracteres ({formData.descricao.length}/10)
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ descricao: "" });
                      setError("");
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading || formData.descricao.trim().length < 10}
                    className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Criando...
                      </>
                    ) : (
                      "Criar Apontamento"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Histórico de Apontamentos</h2>
                <span className="text-sm text-gray-600">
                  {apontamentos.length} {apontamentos.length === 1 ? 'apontamento' : 'apontamentos'}
                </span>
              </div>
            </div>

            {loadingList ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto"></div>
                <p className="text-gray-600 mt-4">Carregando apontamentos...</p>
              </div>
            ) : apontamentos.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Nenhum apontamento encontrado</p>
                <p className="text-gray-400 text-sm mt-2">
                  Crie seu primeiro apontamento clicando no botão acima
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {apontamentos.map((apontamento, index) => (
                  <div key={apontamento.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apontamento.status)}`}>
                            {getStatusIcon(apontamento.status)}
                            {getStatusText(apontamento.status)}
                          </span>
                          {apontamento.idChamado && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Chamado #{apontamento.idChamado}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                          {apontamento.descricao}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{apontamento.ra || apontamento.tecnico || user?.name || "Técnico"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(apontamento.createdAt || apontamento.data)}</span>
                          </div>
                          {apontamento.comeco && apontamento.fim && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {formatDate(apontamento.comeco)} - {formatDate(apontamento.fim)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}