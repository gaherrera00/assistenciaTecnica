const API_BASE_URL = 'http://localhost:3001';

// Função para fazer requisições HTTP
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Adicionar token de autenticação se existir
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensagem || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// APIs de autenticação
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  cadastro: (userData) => apiRequest('/auth/cadastro', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),
};

// APIs de chamados
export const chamadoAPI = {
  listar: () => apiRequest('/chamado'),
  criar: (chamadoData) => apiRequest('/chamado', {
    method: 'POST',
    body: JSON.stringify(chamadoData),
  }),
  atualizar: (id, dados) => apiRequest(`/chamado/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
  deletar: (id) => apiRequest(`/chamado/${id}`, {
    method: 'DELETE',
  }),
};

// APIs de patrimônio
export const patrimonioAPI = {
  listar: () => apiRequest('/patrimonio'),
  criar: (patrimonioData) => apiRequest('/patrimonio', {
    method: 'POST',
    body: JSON.stringify(patrimonioData),
  }),
  atualizar: (id, dados) => apiRequest(`/patrimonio/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
  deletar: (id) => apiRequest(`/patrimonio/${id}`, {
    method: 'DELETE',
  }),
};

// APIs de pool
export const poolAPI = {
  listar: () => apiRequest('/pool'),
  criar: (poolData) => apiRequest('/pool', {
    method: 'POST',
    body: JSON.stringify(poolData),
  }),
  atualizar: (id, dados) => apiRequest(`/pool/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
  deletar: (id) => apiRequest(`/pool/${id}`, {
    method: 'DELETE',
  }),
};

// APIs de apontamentos
export const apontamentoAPI = {
  listar: () => apiRequest('/apontamento'),
  criar: (apontamentoData) => apiRequest('/apontamento', {
    method: 'POST',
    body: JSON.stringify(apontamentoData),
  }),
  atualizar: (id, dados) => apiRequest(`/apontamento/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
  deletar: (id) => apiRequest(`/apontamento/${id}`, {
    method: 'DELETE',
  }),
};
