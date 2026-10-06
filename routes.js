const express = require('express');
const router = express.Router();
const db = require('./db');

// o id da URL precisa ser um número inteiro positivo
function idValido(id) {
    return /^\d+$/.test(id) && Number(id) > 0;
}

// valida o body; devolve os campos já limpos ou null se estiver inválido
function validarPet(body) {
    const { nome, especie, tutor } = body || {};
    const campos = [nome, especie, tutor];

    const ok = campos.every(
        (v) => typeof v === 'string' && v.trim() !== '' && v.trim().length <= 255
    );

    return ok
        ? { nome: nome.trim(), especie: especie.trim(), tutor: tutor.trim() }
        : null;
}

const MSG_INVALIDO = 'Informe nome, especie e tutor (textos não vazios, até 255 caracteres).';

// GET /pet -> lista todos
router.get('/pet', (req, res) => {
    db.query('SELECT id, nome, especie, tutor FROM pet ORDER BY id', (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar os pets.' });
        res.json(results);
    });
});

// GET /pet/:id -> busca um
router.get('/pet/:id', (req, res) => {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido.' });

    db.query('SELECT id, nome, especie, tutor FROM pet WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar o pet.' });
        if (results.length === 0) return res.status(404).json({ erro: 'Pet não encontrado.' });
        res.json(results[0]);
    });
});

// POST /pet -> cria
router.post('/pet', (req, res) => {
    const pet = validarPet(req.body);
    if (!pet) return res.status(400).json({ erro: MSG_INVALIDO });

    db.query(
        'INSERT INTO pet (nome, especie, tutor) VALUES (?, ?, ?)',
        [pet.nome, pet.especie, pet.tutor],
        (err, results) => {
            if (err) return res.status(500).json({ erro: 'Erro ao inserir o pet.' });
            res.status(201).json({ id: results.insertId, ...pet });
        }
    );
});

// PUT /pet/:id -> atualiza
router.put('/pet/:id', (req, res) => {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido.' });

    const pet = validarPet(req.body);
    if (!pet) return res.status(400).json({ erro: MSG_INVALIDO });

    db.query(
        'UPDATE pet SET nome = ?, especie = ?, tutor = ? WHERE id = ?',
        [pet.nome, pet.especie, pet.tutor, id],
        (err, results) => {
            if (err) return res.status(500).json({ erro: 'Erro ao atualizar o pet.' });
            if (results.affectedRows === 0) return res.status(404).json({ erro: 'Pet não encontrado.' });
            res.json({ id: Number(id), ...pet });
        }
    );
});

// DELETE /pet/:id -> remove
router.delete('/pet/:id', (req, res) => {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido.' });

    db.query('DELETE FROM pet WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao remover o pet.' });
        if (results.affectedRows === 0) return res.status(404).json({ erro: 'Pet não encontrado.' });
        res.json({ mensagem: 'Pet removido com sucesso.' });
    });
});

module.exports = router;