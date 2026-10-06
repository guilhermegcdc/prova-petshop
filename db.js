// Configuração e conexão com o banco (MySQL ou MariaDB).
// Se o seu banco usar outro usuário/senha, altere aqui ou use variáveis de ambiente.
const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'petshop',
    charset: 'utf8mb4',
    connectionLimit: 10
});

// testa a conexão ao iniciar (só para avisar no console)
db.getConnection((err, conn) => {
    if (err) {
        console.error('Erro de conexão com o banco de dados:', err.code || err.message);
        return;
    }
    console.log('Conectado ao banco de dados.');
    conn.release();
});

module.exports = db;