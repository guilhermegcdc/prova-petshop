const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        if (err.code === 'EADDRINUSE') {
            console.error(`A porta ${PORT} já está em uso. Feche o outro processo ou use outra porta (ex: PORT=3001).`);
        } else {
            console.error('Erro ao iniciar o servidor:', err.message);
        }
        process.exit(1);
    }
    console.log(`Servidor rodando na porta ${PORT}`);
});