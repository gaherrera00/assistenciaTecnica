    -- Criação da tabela `usuarios`
    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        funcao VARCHAR(100) NOT NULL,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Criação da tabela `pool`
    CREATE TABLE pool (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo ENUM('externo', 'manutencao', 'apoio_tecnico', 'limpeza') NOT NULL,
        descricao TEXT,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (created_by) REFERENCES usuarios(id),
        FOREIGN KEY (updated_by) REFERENCES usuarios(id)
    );

    -- Criação da tabela `chamados`
CREATE TABLE chamados (
    id_chamado INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Dados do usuário
    nome VARCHAR(255) NOT NULL,
    sala VARCHAR(50) NOT NULL,
    ra VARCHAR(20) NOT NULL,
    turma VARCHAR(50) NOT NULL,
    
    -- Dados do chamado
    id_maquina VARCHAR(100) NOT NULL,
    sintoma VARCHAR(255) NOT NULL,
    detalhes TEXT,
    inicio VARCHAR(100),
    frequencia VARCHAR(100),
    historico TEXT,
    
    -- Controle de status
    status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

    -- Criação da tabela `apontamentos`
    CREATE TABLE apontamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        chamado_id INT,
        tecnico_id INT,
        descricao TEXT,
        comeco TIMESTAMP NOT NULL,
        fim TIMESTAMP NOT NULL,
        duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED, -- Calcula a duração em segundos
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chamado_id) REFERENCES chamados(id),
        FOREIGN KEY (tecnico_id) REFERENCES usuarios(id)
    );

    -- Criação da tabela `pool_tecnico`
    CREATE TABLE pool_tecnico (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pool INT,
        id_tecnico INT,
        FOREIGN KEY (id_pool) REFERENCES pool(id),
        FOREIGN KEY (id_tecnico) REFERENCES usuarios(id)
    );

    -- Índices adicionais para otimização
    CREATE INDEX idx_usuarios_email ON usuarios(email);
    CREATE INDEX idx_chamados_status ON chamados(status);
    CREATE INDEX idx_apontamentos_comeco_fim ON apontamentos(comeco, fim);
