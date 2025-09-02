CREATE DATABASE zelos;
USE zelos;

-- Criação da tabela `usuarios`
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    ra INT UNIQUE,
    funcao VARCHAR(100) NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserção de usuários de exemplo
INSERT INTO usuarios (nome, senha, email, ra, funcao)
VALUES ('João da Silva', 'senha123', 'joao@email.com', 123456, 'aluno');
INSERT INTO usuarios (nome, senha, email, ra, funcao)
VALUES ('Carlos Oliveira', 'senha123', 'carlos.tecnico@email.com', 12345, 'tecnico');

-- Criação da tabela `patrimonios` (deve vir antes de chamados)
CREATE TABLE patrimonios (
    id_patrimonio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo_item ENUM('Computador', 'Mesa', 'Cadeira', 'Impressora', 'Projetor', 'Outros') NOT NULL,
    sala VARCHAR(250) NOT NULL,
    status ENUM('disponível', 'em uso', 'em manutenção') DEFAULT 'disponível',
    data_aquisicao DATE,
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserção de patrimônios de exemplo
INSERT INTO patrimonios (tipo_item, sala, status, data_aquisicao, observacoes)
VALUES ('Computador', '1A-01', 'disponível', '2023-05-10', 'Computador com SSD');
INSERT INTO patrimonios (tipo_item, sala, status, data_aquisicao, observacoes)
VALUES ('Computador', '1A-02', 'disponível', '2023-05-10', 'Computador com HD');
INSERT INTO patrimonios (tipo_item, sala, status, data_aquisicao, observacoes)
VALUES ('Computador', '1B-01', 'disponível', '2023-05-10', 'Computador com SSD');
INSERT INTO patrimonios (tipo_item, sala, status, data_aquisicao, observacoes)
VALUES ('Computador', '1B-02', 'disponível', '2023-05-10', 'Computador com HD');
INSERT INTO patrimonios (tipo_item, sala, status, data_aquisicao, observacoes)
VALUES ('Computador', '2A-01', 'disponível', '2023-05-10', 'Computador com SSD');
INSERT INTO patrimonios (tipo_item, sala, status, data_aquisicao, observacoes)
VALUES ('Projetor', '1A-01', 'disponível', '2023-05-10', 'Projetor HD');
INSERT INTO patrimonios (tipo_item, sala, status, data_aquisicao, observacoes)
VALUES ('Impressora', '1A-01', 'disponível', '2023-05-10', 'Impressora Laser');

-- Criação da tabela `pool`
CREATE TABLE pool (
    id_pool INT AUTO_INCREMENT PRIMARY KEY,
    titulo ENUM('externo', 'manutencao', 'apoio_tecnico', 'limpeza') NOT NULL,
    descricao TEXT,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (created_by) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (updated_by) REFERENCES usuarios(id_usuario)
);

-- Criação da tabela `pool_tecnico`
CREATE TABLE pool_tecnico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pool INT,
    id_tecnico INT,
    FOREIGN KEY (id_pool) REFERENCES pool(id_pool),
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario)
);

-- Criação da tabela `chamados`
CREATE TABLE chamados (
    id_chamado INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Dados do usuário
    nome VARCHAR(255) NOT NULL,
    sala VARCHAR(250) NOT NULL,
    ra INT NOT NULL,
    turma VARCHAR(50) NOT NULL,
    
    -- Dados do chamado
    id_patrimonio INT NOT NULL,
    sintoma VARCHAR(255) NOT NULL,
    detalhes TEXT,
    inicio TIMESTAMP NOT NULL,
    frequencia VARCHAR(100),
    historico TEXT,
    
    -- Controle de status
    status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_patrimonio) REFERENCES patrimonios(id_patrimonio),
    FOREIGN KEY (ra) REFERENCES usuarios(ra)
);

-- Criação da tabela `apontamentos`
CREATE TABLE apontamentos (
    id_apontamentos INT AUTO_INCREMENT PRIMARY KEY,
    id_chamado INT NOT NULL,
    id_tecnico INT NOT NULL,
    descricao TEXT,
    comeco TIMESTAMP NOT NULL,
    fim TIMESTAMP NULL,
    duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_chamado) REFERENCES chamados(id_chamado),
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario)
);