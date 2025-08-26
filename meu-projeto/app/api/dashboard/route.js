import { NextResponse } from 'next/server';
import { verifyToken, getTokenFromHeader } from '../../../utils/auth';

// Simulação de dados do banco
const chamados = [
  {
    id: 1,
    titulo: 'Computador não liga',
    descricao: 'O computador não está ligando após queda de energia',
    sintomas: 'Tela preta, sem sinal de vida, LED não acende',
    historico: 'Última manutenção: 3 meses atrás. Problema similar ocorreu há 6 meses.',
    detalhes: 'Modelo: Dell OptiPlex 7090, Série: ABC123, Localização: Setor A',
    status: 'pendente',
    prioridade: 'alta',
    categoria: 'hardware',
    dataCriacao: '2024-01-15T10:30:00Z',
    dataAtualizacao: '2024-01-15T10:30:00Z',
    userId: 3,
    tecnicoId: null,
    resolucao: null
  },
  {
    id: 2,
    titulo: 'Internet lenta',
    descricao: 'Conexão de internet muito lenta durante o dia',
    sintomas: 'Velocidade reduzida, timeout em sites, download lento',
    historico: 'Problema recorrente há 2 semanas. Já foi reportado 3 vezes.',
    detalhes: 'Rede: WiFi 5GHz, IP: 192.168.1.100, Switch: Porta 3',
    status: 'em_andamento',
    prioridade: 'media',
    categoria: 'rede',
    dataCriacao: '2024-01-14T14:20:00Z',
    dataAtualizacao: '2024-01-15T09:15:00Z',
    userId: 3,
    tecnicoId: 2,
    resolucao: 'Verificando configurações de rede'
  },
  {
    id: 3,
    titulo: 'Software travando',
    descricao: 'Sistema ERP travando frequentemente',
    sintomas: 'Tela congelada, não responde a comandos, erro 404',
    historico: 'Primeira ocorrência hoje. Sistema atualizado semana passada.',
    detalhes: 'Software: ERP v2.1, SO: Windows 11, RAM: 8GB',
    status: 'resolvido',
    prioridade: 'baixa',
    categoria: 'software',
    dataCriacao: '2024-01-13T16:45:00Z',
    dataAtualizacao: '2024-01-14T11:30:00Z',
    userId: 3,
    tecnicoId: 2,
    resolucao: 'Reiniciado serviço e limpeza de cache'
  },
  {
    id: 4,
    titulo: 'Impressora com defeito',
    descricao: 'Impressora não está imprimindo corretamente',
    sintomas: 'Papel emperra, impressão borrada, barulho estranho',
    historico: 'Manutenção preventiva há 1 mês. Cartucho trocado há 2 semanas.',
    detalhes: 'Modelo: HP LaserJet Pro M404n, Série: XYZ789, Local: Sala de Reuniões',
    status: 'pendente',
    prioridade: 'alta',
    categoria: 'perifericos',
    dataCriacao: '2024-01-15T08:15:00Z',
    dataAtualizacao: '2024-01-15T08:15:00Z',
    userId: 3,
    tecnicoId: null,
    resolucao: null
  }
];

export async function GET(request) {
  try {
    // Verifica autenticação
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticação necessário' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    let dadosFiltrados = [];

    // Filtra dados baseado no role
    switch (decoded.role) {
      case 'admin':
        // Admin: só o resumo do ocorrido
        dadosFiltrados = chamados.map(chamado => ({
          id: chamado.id,
          titulo: chamado.titulo,
          status: chamado.status,
          prioridade: chamado.prioridade,
          categoria: chamado.categoria,
          dataCriacao: chamado.dataCriacao,
          dataAtualizacao: chamado.dataAtualizacao,
          userId: chamado.userId,
          tecnicoId: chamado.tecnicoId
        }));
        break;

      case 'tecnico':
        // Técnico: todos os sintomas, histórico e detalhes
        dadosFiltrados = chamados.map(chamado => ({
          id: chamado.id,
          titulo: chamado.titulo,
          descricao: chamado.descricao,
          sintomas: chamado.sintomas,
          historico: chamado.historico,
          detalhes: chamado.detalhes,
          status: chamado.status,
          prioridade: chamado.prioridade,
          categoria: chamado.categoria,
          dataCriacao: chamado.dataCriacao,
          dataAtualizacao: chamado.dataAtualizacao,
          userId: chamado.userId,
          tecnicoId: chamado.tecnicoId,
          resolucao: chamado.resolucao
        }));
        break;

      case 'user':
        // User: apenas os próprios chamados
        dadosFiltrados = chamados
          .filter(chamado => chamado.userId === decoded.userId)
          .map(chamado => ({
            id: chamado.id,
            titulo: chamado.titulo,
            descricao: chamado.descricao,
            status: chamado.status,
            prioridade: chamado.prioridade,
            categoria: chamado.categoria,
            dataCriacao: chamado.dataCriacao,
            dataAtualizacao: chamado.dataAtualizacao,
            tecnicoId: chamado.tecnicoId,
            resolucao: chamado.resolucao
          }));
        break;

      default:
        return NextResponse.json(
          { error: 'Role não autorizado' },
          { status: 403 }
        );
    }

    return NextResponse.json({
      dados: dadosFiltrados,
      role: decoded.role,
      total: dadosFiltrados.length
    });

  } catch (error) {
    console.error('Erro no dashboard:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
