# Conexão Frontend Next.js com Backend Express

Este documento descreve como o frontend Next.js foi conectado com o backend Express existente.

## Configuração do Ambiente

### 1. Variáveis de Ambiente
O arquivo `.env.local` foi criado com:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Backend Configurado
- Rota de apontamentos adicionada ao `app.js`
- Endpoints existentes mantidos
- CORS configurado para permitir comunicação

## Páginas Conectadas

### 1. Login (`/login`)
- **Funcionalidade**: Autenticação de usuários
- **Endpoint**: `POST /auth/login`
- **Recursos**:
  - Validação de formulário
  - Estados de loading
  - Mensagens de erro
  - Redirecionamento baseado no tipo de usuário
  - Armazenamento de JWT no localStorage

### 2. Cadastro (`/cadastro`)
- **Funcionalidade**: Registro de novos usuários
- **Endpoint**: `POST /auth/cadastro`
- **Recursos**:
  - Geração automática de RA para clientes
  - Validação de formulário
  - Feedback visual de sucesso/erro
  - Redirecionamento para login após cadastro

### 3. Chamados (`/formularioUser`)
- **Funcionalidade**: Criação de chamados técnicos
- **Endpoint**: `POST /chamado`
- **Recursos**:
  - Formulário em duas etapas
  - Upload de imagens (preview)
  - Combinação de dados do usuário e chamado
  - Proteção de rota (autenticação obrigatória)

### 4. Listagem de Chamados (`/chamadosEnviados`)
- **Funcionalidade**: Visualização e gerenciamento de chamados
- **Endpoints**: 
  - `GET /chamado` (listar)
  - `PUT /chamado/:id` (aceitar chamado)
- **Recursos**:
  - Tabela dinâmica
  - Botão para aceitar chamados
  - Estados de loading
  - Tratamento de erros
  - Proteção de rota

### 5. Apontamentos (`/apontamentos`)
- **Funcionalidade**: Criação de apontamentos de trabalho
- **Endpoint**: `POST /apontamento`
- **Recursos**:
  - Formulário completo
  - Seleção de status
  - Campos de data/hora
  - Proteção de rota

## Componentes Criados

### 1. ProtectedRoute
- **Localização**: `app/components/ProtectedRoute.jsx`
- **Funcionalidade**: Protege rotas que precisam de autenticação
- **Comportamento**: Redireciona para login se não autenticado

### 2. Utilitários de Autenticação
- **Localização**: `utils/auth.js`
- **Funções**:
  - `getAuthToken()`: Obtém token do localStorage
  - `setAuthToken()`: Salva token no localStorage
  - `removeAuthToken()`: Remove token do localStorage
  - `isAuthenticated()`: Verifica se está autenticado
  - `getUser()`: Obtém dados do usuário
  - `logout()`: Faz logout e redireciona

## Recursos Implementados

### 1. Estados de Loading
- Botões desabilitados durante requisições
- Indicadores visuais de carregamento
- Prevenção de múltiplos envios

### 2. Feedback Visual
- Mensagens de sucesso (verde)
- Mensagens de erro (vermelho)
- Validação de formulários
- Estados de botões

### 3. Tratamento de Erros
- Try/catch em todas as requisições
- Mensagens de erro amigáveis
- Fallbacks para erros de conexão

### 4. Autenticação
- JWT armazenado no localStorage
- Headers de autorização automáticos
- Proteção de rotas sensíveis
- Redirecionamento automático

## Como Usar

### 1. Iniciar o Backend
```bash
cd backend
npm install
npm start
```

### 2. Iniciar o Frontend
```bash
cd meu-projeto
npm install
npm run dev
```

### 3. Fluxo de Uso
1. Acesse `http://localhost:3000`
2. Faça cadastro ou login
3. Navegue pelas funcionalidades:
   - Clientes: Criar chamados
   - Técnicos/Gerentes: Visualizar e gerenciar chamados
   - Todos: Criar apontamentos

## Endpoints Utilizados

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/cadastro` - Cadastro

### Chamados
- `GET /chamado` - Listar chamados
- `POST /chamado` - Criar chamado
- `PUT /chamado/:id` - Atualizar chamado

### Apontamentos
- `GET /apontamento` - Listar apontamentos
- `POST /apontamento` - Criar apontamento
- `GET /apontamento/:id` - Obter apontamento específico
- `DELETE /apontamento/:id` - Excluir apontamento

## Observações

- Todos os formulários funcionam com a API real
- Nenhuma nova página foi criada (apenas apontamentos que não existia)
- Nenhum novo endpoint foi criado no backend
- A estrutura do banco de dados foi mantida
- O sistema está totalmente funcional e integrado
