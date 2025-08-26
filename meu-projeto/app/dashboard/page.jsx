"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch("/api/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDados(data.dados);
      } else if (response.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao carregar dados");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-500';
      case 'em_andamento': return 'bg-blue-500';
      case 'resolvido': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'text-red-600';
      case 'media': return 'text-yellow-600';
      case 'baixa': return 'text-green-600';
      default: return 'text-gray-600';
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
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-white text-green-800 rounded-lg hover:bg-gray-100"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Se não há dados, mostra mensagem apropriada
  if (dados.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Dashboard - {user?.name} ({user?.role})
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sair
            </button>
          </div>
          
          <div className="text-center text-white text-xl">
            Nenhum chamado encontrado para seu perfil.
          </div>
        </div>
      </div>
    );
  }

  // Pega dinamicamente as colunas que vieram da API
  const colunas = Object.keys(dados[0]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Dashboard - {user?.name} ({user?.role})
            </h1>
            <p className="text-green-100 mt-2">
              Total de chamados: {dados.length}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        {/* Tabela Dinâmica */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {colunas.map((coluna) => (
                    <th
                      key={coluna}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {coluna.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dados.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50">
                    {colunas.map((coluna) => (
                      <td key={coluna} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {coluna === 'status' ? (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(item[coluna])}`}>
                            {item[coluna]}
                          </span>
                        ) : coluna === 'prioridade' ? (
                          <span className={`font-medium ${getPriorityColor(item[coluna])}`}>
                            {item[coluna]}
                          </span>
                        ) : coluna.includes('data') ? (
                          formatDate(item[coluna])
                        ) : coluna === 'sintomas' || coluna === 'historico' || coluna === 'detalhes' ? (
                          <div className="max-w-xs">
                            <p className="truncate" title={item[coluna]}>
                              {item[coluna]}
                            </p>
                          </div>
                        ) : (
                          item[coluna]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações do Role */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Informações do seu perfil ({user?.role})
          </h3>
          <div className="text-sm text-gray-600">
            {user?.role === 'admin' && (
              <p>Você tem acesso ao resumo de todos os chamados do sistema.</p>
            )}
            {user?.role === 'tecnico' && (
              <p>Você tem acesso completo a todos os chamados, incluindo sintomas, histórico e detalhes técnicos.</p>
            )}
            {user?.role === 'user' && (
              <p>Você pode visualizar apenas os seus próprios chamados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
