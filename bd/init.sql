CREATE DATABASE zelos;

use zelos;

-- Criação da tabela `usuarios`
CREATE TABLE
    usuarios (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        ra VARCHAR(20) NOT NULL UNIQUE,
        funcao VARCHAR(100) NOT NULL,
        status ENUM ('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Criação da tabela `pool`
CREATE TABLE
    pool (
        id_pool INT AUTO_INCREMENT PRIMARY KEY,
        titulo ENUM (
            'externo',
            'manutencao',
            'apoio_tecnico',
            'limpeza'
        ) NOT NULL,
        descricao TEXT,
        status ENUM ('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (created_by) REFERENCES usuarios (id_usuario),
        FOREIGN KEY (updated_by) REFERENCES usuarios (id_usuario)
    );

-- Criação da tabela `pool_tecnico`
CREATE TABLE
    pool_tecnico (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pool INT,
        id_tecnico INT,
        FOREIGN KEY (id_pool) REFERENCES pool (id_pool),
        FOREIGN KEY (id_tecnico) REFERENCES usuarios (id_usuario)
    );

CREATE TABLE
    patrimonios (
        id_patrimonio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        tipo_item ENUM (
            'Computador',
            'Mesa',
            'Cadeira',
            'Impressora',
            'Projetor',
            'Outros'
        ) NOT NULL,
        sala VARCHAR(250) NOT NULL,
        status ENUM ('disponível', 'em uso', 'em manutenção') DEFAULT 'disponível',
        data_aquisicao DATE,
        observacoes TEXT,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Criação da tabela `chamados`
CREATE TABLE
    chamados (
        id_chamado INT AUTO_INCREMENT PRIMARY KEY,
        -- Dados do usuário
        nome VARCHAR(255) NOT NULL,
        sala VARCHAR(250) NOT NULL,
        ra VARCHAR(20) NOT NULL,
        turma VARCHAR(50) NOT NULL,
        -- Dados do chamado
        id_patrimonio INT NOT NULL,
        sintoma VARCHAR(255) NOT NULL,
        detalhes TEXT,
        inicio TIMESTAMP NOT NULL,
        frequencia VARCHAR(100),
        historico TEXT,
        -- Controle de status
        status ENUM ('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (id_patrimonio) REFERENCES patrimonios (id_patrimonio),
        FOREIGN KEY (ra) REFERENCES usuarios (ra)
    );

CREATE TABLE
    apontamentos (
        id_apontamentos INT AUTO_INCREMENT PRIMARY KEY,
        id_chamado INT NOT NULL,
        id_tecnico INT NOT NULL,
        descricao TEXT,
        comeco TIMESTAMP NOT NULL,
        fim TIMESTAMP NULL,
        duracao INT AS (TIMESTAMPDIFF (SECOND, comeco, fim)) STORED,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_chamado) REFERENCES chamados (id_chamado),
        FOREIGN KEY (id_tecnico) REFERENCES usuarios (id_usuario)
    );

-- Inserção na tabela usuarios
INSERT INTO
    usuarios (nome, senha, email, ra, funcao, status)
VALUES
    (
        'João Silva',
        'senha123',
        'joao@exemplo.com',
        'RA1001',
        'técnico',
        'ativo'
    ),
    (
        'Maria Oliveira',
        'senha456',
        'maria@exemplo.com',
        'RA1002',
        'aluno',
        'ativo'
    ),
    (
        'Carlos Souza',
        'senha789',
        'carlos@exemplo.com',
        'RA1003',
        'administrador',
        'ativo'
    ),
    (
        'Ana Lima',
        'senhaabc',
        'ana@exemplo.com',
        'RA1004',
        'técnico',
        'ativo'
    );

-- Inserção na tabela patrimonios
INSERT INTO
    patrimonios (
        tipo_item,
        sala,
        status,
        data_aquisicao,
        observacoes
    )
VALUES
    (
        'Computador',
        'Sala 101',
        'em uso',
        '2023-05-10',
        'Computador com SSD'
    ),
    (
        'Projetor',
        'Sala 102',
        'disponível',
        '2022-11-15',
        'Projetor HDMI'
    ),
    (
        'Mesa',
        'Sala 201',
        'em manutenção',
        '2021-03-20',
        'Mesa com perna danificada'
    );

-- Inserção na tabela pool
INSERT INTO
    pool (titulo, descricao, status, created_by, updated_by)
VALUES
    (
        'apoio_tecnico',
        'Atendimento técnico geral',
        'ativo',
        1,
        3
    ),
    (
        'limpeza',
        'Manutenção da limpeza das salas',
        'ativo',
        3,
        3
    ),
    (
        'manutencao',
        'Serviços de manutenção de mobiliário',
        'ativo',
        1,
        1
    );

-- Inserção na tabela pool_tecnico
INSERT INTO
    pool_tecnico (id_pool, id_tecnico)
VALUES
    (1, 1),
    (3, 4);

-- Inserção na tabela chamados
INSERT INTO
    chamados (
        nome,
        sala,
        ra,
        turma,
        id_patrimonio,
        sintoma,
        detalhes,
        inicio,
        frequencia,
        historico,
        status
    )
VALUES
    (
        'Maria Oliveira',
        'Sala 101',
        'RA1002',
        '3ºA',
        1,
        'PC não liga',
        'Ao apertar o botão, nada acontece',
        '2025-08-27 08:30:00',
        'Primeira vez',
        '',
        'pendente'
    ),
    (
        'Maria Oliveira',
        'Sala 102',
        'RA1002',
        '3ºA',
        2,
        'Imagem distorcida',
        'Projetor mostra cores erradas',
        '2025-08-26 10:00:00',
        'Recorrente',
        'Já foi ajustado em junho',
        'em andamento'
    );

-- Inserção na tabela apontamentos
INSERT INTO
    apontamentos (id_chamado, id_tecnico, descricao, comeco, fim)
VALUES
    (
        1,
        1,
        'Verificação da fonte de alimentação do PC',
        '2025-08-27 09:00:00',
        '2025-08-27 09:30:00'
    ),
    (
        2,
        4,
        'Ajuste no cabo HDMI e reinicialização do projetor',
        '2025-08-26 10:15:00',
        '2025-08-26 10:45:00'
    );