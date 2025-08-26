# Dashboard Compartilhado - Sistema de Assistência Técnica

## Visão Geral

Este sistema implementa um dashboard compartilhado com diferentes níveis de acesso baseados em roles (admin, técnico, user). A lógica de filtro de dados fica no backend para garantir segurança, enquanto o frontend apenas renderiza dinamicamente o que recebe da API.

## Estrutura do Sistema

### 1. Autenticação e Autorização
- **API de Login**: `/api/auth/login` - Retorna JWT com role do usuário
- **Middleware de Auth**: `utils/auth.js` - Verifica e decodifica tokens JWT
- **Página de Login**: `/login` - Interface de autenticação

### 2. Dashboard Dinâmico
- **API de Dashboard**: `/api/dashboard` - Filtra dados baseado no role
- **Página do Dashboard**: `/dashboard` - Renderiza dados dinamicamente

## Níveis de Acesso

### Admin
- **Acesso**: Resumo de todos os chamados
- **Dados visíveis**: ID, título, status, prioridade, categoria, datas, IDs de usuário e técnico
- **Credenciais**: `admin@exemplo.com` / `password`

### Técnico
- **Acesso**: Todos os chamados com detalhes completos
- **Dados visíveis**: Todos os campos incluindo sintomas, histórico e detalhes técnicos
- **Credenciais**: `tecnico@exemplo.com` / `password`

### User
- **Acesso**: Apenas próprios chamados
- **Dados visíveis**: Chamados do usuário logado (filtrado por userId)
- **Credenciais**: `user@exemplo.com` / `password`

## Características Técnicas

### Backend (Segurança)
- ✅ Filtro de dados no servidor baseado no role
- ✅ Validação de JWT em todas as requisições
- ✅ Dados sensíveis protegidos no backend
- ✅ Sem lógica de autorização no frontend

### Frontend (Dinâmico)
- ✅ Renderização dinâmica baseada na resposta da API
- ✅ Sem if/else espalhado para diferentes roles
- ✅ Colunas da tabela adaptadas automaticamente
- ✅ Interface responsiva e moderna

## Como Usar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar o projeto**:
   ```bash
   npm run dev
   ```

3. **Acessar o sistema**:
   - Vá para `http://localhost:3000`
   - Clique em "ACESSAR SISTEMA"
   - Use uma das credenciais de teste

## Fluxo de Funcionamento

1. **Login**: Usuário faz login e recebe JWT com role
2. **Dashboard**: Frontend chama API com token
3. **Filtro**: Backend filtra dados baseado no role do JWT
4. **Renderização**: Frontend renderiza dinamicamente os dados recebidos

## Arquivos Principais

- `app/api/auth/login/route.js` - API de autenticação
- `app/api/dashboard/route.js` - API de dashboard com filtros
- `utils/auth.js` - Utilitários de autenticação
- `app/login/page.jsx` - Página de login
- `app/dashboard/page.jsx` - Dashboard dinâmico

## Segurança

- Tokens JWT com expiração de 24h
- Senhas criptografadas com bcrypt
- Validação de token em todas as APIs
- Filtro de dados no servidor
- Sem exposição de lógica de autorização no cliente

## Dados de Exemplo

O sistema inclui dados simulados de chamados técnicos com diferentes status, prioridades e categorias para demonstrar o funcionamento dos filtros por role.
