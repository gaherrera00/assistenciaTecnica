"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser } from "../../utils/auth";
import { chamadoAPI } from "../../utils/api";

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    const userData = getUser();
    setUser(userData);
    fetchChamados();
  }, [router]);

  const fetchChamados = async () => {
    try {
      const data = await chamadoAPI.listar();
      setChamados(data);
    } catch (err) {
      if (err.message.includes('401') || err.message.includes('403')) {
        // Token expirado ou inválido
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }
      setError("Erro ao carregar chamados: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAceitarChamado = async (chamadoId) => {
    try {
      setLoading(true);
      // Atualizar o status do chamado para "em andamento"
      await chamadoAPI.atualizar(chamadoId, { status: 'em andamento' });

      // Recarregar os chamados para mostrar a atualização
      await fetchChamados();

      // Mostrar mensagem de sucesso
      alert('Chamado aceito com sucesso!');
    } catch (err) {
      setError("Erro ao aceitar chamado: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-500';
      case 'em andamento': return 'bg-blue-500';
      case 'concluído': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700 flex items-center justify-center">
        <div className="text-white text-xl">Carregando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-200 mb-4">{error}</p>
          <button
            onClick={fetchChamados}
            className="px-4 py-2 bg-white text-green-800 rounded-lg hover:bg-gray-100"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Dashboard - {user?.nome} ({user?.funcao})
            </h1>
            <p className="text-green-100 mt-2">
              {user?.funcao === 'aluno' ? (
                `Seus chamados: ${chamados.length}`
              ) : (
                `Total de chamados: ${chamados.length}`
              )}
            </p>
            {user?.funcao === 'aluno' && (
              <p className="text-green-200 text-sm mt-1">
                Visualizando apenas seus próprios chamados
              </p>
            )}
            {(user?.funcao === 'tecnico' || user?.funcao === 'gerente' || user?.funcao === 'administrador') && (
              <p className="text-green-200 text-sm mt-1">
                Visualizando todos os chamados do sistema
              </p>
            )}
          </div>
        </div>

        {/* Tabelas específicas para cada tipo de usuário */}
        {chamados.length > 0 ? (
          <>
            {/* Tabela para ALUNOS - Apenas seus próprios chamados */}
            {user?.funcao === 'aluno' && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 bg-blue-50 border-b">
                  <h3 className="text-lg font-semibold text-blue-800">Seus Chamados</h3>
                  <p className="text-blue-600 text-sm">Visualizando apenas os chamados que você enviou</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turma</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sintoma</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {chamados.map((chamado) => (
                        <tr key={chamado.id_chamado} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.id_chamado}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.sala}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.turma}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs">
                              <p className="truncate" title={chamado.sintoma}>{chamado.sintoma}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(chamado.status)}`}>
                              {chamado.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(chamado.inicio)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(chamado.criado_em)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tabela para TÉCNICOS - Foco técnico com botão de aceitar */}
            {(user?.funcao === 'tecnico' || user?.funcao === 'técnico') && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 bg-green-50 border-b">
                  <h3 className="text-lg font-semibold text-green-800">Chamados Técnicos</h3>
                  <p className="text-green-600 text-sm">Gerencie e aceite chamados pendentes com informações técnicas completas</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patrimônio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sintoma</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalhes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequência</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Histórico</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {chamados.map((chamado) => (
                        <tr key={chamado.id_chamado} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.id_chamado}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.nome}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.sala}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              #{chamado.id_patrimonio}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs">
                              <p className="truncate font-medium" title={chamado.sintoma}>{chamado.sintoma}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs">
                              <p className="truncate" title={chamado.detalhes || 'Sem detalhes'}>
                                {chamado.detalhes || 'Sem detalhes'}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(chamado.inicio)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${chamado.frequencia === 'Recorrente' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                              {chamado.frequencia || 'Primeira vez'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs">
                              <p className="truncate" title={chamado.historico || 'Sem histórico'}>
                                {chamado.historico || 'Sem histórico'}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(chamado.status)}`}>
                              {chamado.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {chamado.status === 'pendente' && (
                              <button
                                onClick={() => handleAceitarChamado(chamado.id_chamado)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                              >
                                Aceitar
                              </button>
                            )}
                            {chamado.status === 'em andamento' && (
                              <span className="text-blue-600 text-xs">Em atendimento</span>
                            )}
                            {chamado.status === 'concluído' && (
                              <span className="text-green-600 text-xs">Finalizado</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tabela para ADMINISTRADORES - Visão completa sem botão de aceitar */}
            {(user?.funcao === 'administrador' || user?.funcao === 'gerente') && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 bg-purple-50 border-b">
                  <h3 className="text-lg font-semibold text-purple-800">Visão Administrativa</h3>
                  <p className="text-purple-600 text-sm">Acompanhe todos os chamados do sistema</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RA</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turma</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sintoma</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequência</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {chamados.map((chamado) => (
                        <tr key={chamado.id_chamado} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.id_chamado}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.nome}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.ra}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.sala}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chamado.turma}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs">
                              <p className="truncate" title={chamado.sintoma}>{chamado.sintoma}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(chamado.status)}`}>
                              {chamado.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${chamado.frequencia === 'Recorrente' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                              {chamado.frequencia || 'Primeira vez'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(chamado.inicio)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(chamado.criado_em)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-white text-xl">
            Nenhum chamado encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
