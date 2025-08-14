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
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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
	titulo VARCHAR(255) NOT NULL,
	descricao TEXT NOT NULL,
	tipo_id INT,
	tecnico_id INT,
	usuario_id INT,
	status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (tipo_id) REFERENCES pool(id_pool),
	FOREIGN KEY (tecnico_id) REFERENCES usuarios(id_usuario),
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE apontamentos (
    id_apontamentos INT AUTO_INCREMENT PRIMARY KEY,
    chamado_id INT,
    tecnico_id INT,
    descricao TEXT,
    comeco TIMESTAMP NOT NULL,
    fim TIMESTAMP NULL, -- permite ser nulo até que o chamado seja encerrado
    duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED, -- Calcula a duração em segundos
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chamado_id) REFERENCES chamados(id_chamado),
    FOREIGN KEY (tecnico_id) REFERENCES usuarios(id_usuario)
);
