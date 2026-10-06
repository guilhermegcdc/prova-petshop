-- Script de criação do banco e da tabela (funciona em MySQL e MariaDB)
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS petshop
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE petshop;

CREATE TABLE IF NOT EXISTS pet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    especie VARCHAR(255) NOT NULL,
    tutor VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- dados de exemplo (só entram se a tabela estiver vazia, então pode rodar o script mais de uma vez)
INSERT INTO pet (nome, especie, tutor)
SELECT * FROM (
    SELECT 'Rex' AS nome, 'Cachorro' AS especie, 'Maria Silva' AS tutor
    UNION ALL SELECT 'Mimi', 'Gato', 'João Souza'
    UNION ALL SELECT 'Piu', 'Pássaro', 'Ana Costa'
) AS exemplo
WHERE NOT EXISTS (SELECT 1 FROM pet);