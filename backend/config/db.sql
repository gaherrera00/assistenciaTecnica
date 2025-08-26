CREATE DATABASE zelos;
use zelos;

-- Criação da tabela `usuarios`
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    funcao VARCHAR(100) NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
);

-- Criação da tabela `pool`
CREATE TABLE pool (
    id_pool INT AUTO_INCREMENT PRIMARY KEY,
    titulo ENUM('externo', 'manutencao', 'apoio_tecnico', 'limpeza') NOT NULL,
    descricao TEXT,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (criado_em) REFERENCES pool(criado_em),
    FOREIGN KEY (atualizado_em) REFERENCES usuarios(atualizado_em)
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
    ra VARCHAR(20) NOT NULL,
    turma VARCHAR(50) NOT NULL,
    
    -- Dados do chamado
    patrimonios_id INT NOT NULL,
    sintoma VARCHAR(255) NOT NULL,
    detalhes TEXT,
    inicio TIMESTAMP NOT NULL,
    frequencia VARCHAR(100),
    historico TEXT,
    
    -- Controle de status
    status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patrimonios_id) REFERENCES patrimonios(id_patrimonio)
);

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

CREATE TABLE apontamentos (
    id_apontamentos INT AUTO_INCREMENT PRIMARY KEY,
    chamado_id INT NOT NULL,
    tecnico_id INT NOT NULL,
    descricao TEXT,
    comeco TIMESTAMP NOT NULL,
    fim TIMESTAMP NULL,
    duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chamado_id) REFERENCES chamados(id_chamado),
    FOREIGN KEY (tecnico_id) REFERENCES usuarios(id_usuario)
);