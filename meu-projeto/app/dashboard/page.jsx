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
              Total de chamados: {chamados.length}
            </p>
          </div>
        </div>

        {/* Tabela de Chamados */}
        {chamados.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sala
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Turma
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sintoma
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Início
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criado em
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {chamados.map((chamado) => (
                    <tr key={chamado.id_chamado} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chamado.id_chamado}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chamado.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chamado.sala}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chamado.ra}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chamado.turma}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          <p className="truncate" title={chamado.sintoma}>
                            {chamado.sintoma}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(chamado.status)}`}>
                          {chamado.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(chamado.inicio)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(chamado.criado_em)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-white text-xl">
            Nenhum chamado encontrado.
          </div>
        )}

        {/* Informações do Perfil */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Informações do seu perfil ({user?.funcao})
          </h3>
          <div className="text-sm text-gray-600">
            {user?.funcao === 'gerente' && (
              <p>Você tem acesso ao resumo de todos os chamados do sistema.</p>
            )}
            {user?.funcao === 'tecnico' && (
              <p>Você tem acesso completo a todos os chamados, incluindo sintomas, histórico e detalhes técnicos.</p>
            )}
            {user?.funcao === 'aluno' && (
              <p>Você pode visualizar apenas os seus próprios chamados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
