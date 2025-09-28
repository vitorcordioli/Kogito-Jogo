const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
require('dotenv').config({ path: '../.env' });
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "data:", "blob:"],
    }
  }
}));

app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

  db.connect(err => {
    if (err) {
      console.error('Erro ao conectar:', err);
    } else {
      console.log('Conectado ao MySQL!');
      console.log("Banco conectado:", process.env.DB_NAME);
    }
  });

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

app.post('/register',
  [
    body('email').isEmail(),
    body('senha').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO users (email, senha) VALUES (?, ?)';
    db.query(sql, [email, hash], (err, result) => {
      if (err) return res.status(400).json({ error: 'Email já cadastrado' });
      res.json({ success: true, id: result.insertId });
    });
  });

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const user = results[0];
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        fase: user.fase,
        pontuacao: user.pontuacao,
        perguntas_index: user.perguntas_index
      }
    });
  });
});

app.post('/updateProgress', autenticarToken,
  [
    body('fase').isInt({ min: 0 }).toInt(),
    body('pontuacao').isInt({ min: 0 }).toInt()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { fase, pontuacao } = req.body;
    const id = req.user.id;
    const sql = 'UPDATE users SET fase = ?, pontuacao = ? WHERE id = ?';
    db.query(sql, [fase, pontuacao, id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar progresso' });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json({ success: true });
    });
  });

app.post('/saveProgressWithQuestion', autenticarToken, [
  body('fase').isInt({ min: 0 }).toInt(),
  body('pontuacao').isInt({ min: 0 }).toInt(),
  body('perguntas_index').isInt({ min: 0 }).toInt()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fase, pontuacao, perguntas_index } = req.body;
  const id = req.user.id;

  const sql = 'UPDATE users SET fase = ?, pontuacao = ?, perguntas_index = ? WHERE id = ?';
  db.query(sql, [fase, pontuacao, perguntas_index, id], (err, result) => {
    if (err) {
      console.error("Erro no SQL:", err);
      return res.status(500).json({ error: 'Erro ao salvar progresso com perguntas' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ success: true });
  });
});

app.get('/getProgressWithQuestions', autenticarToken, (req, res) => {
  const id = req.user.id;
  const sql = 'SELECT fase, pontuacao, perguntas_index FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar progresso' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({
      success: true,
      fase: results[0].fase,
      pontuacao: results[0].pontuacao,
      perguntas_index: results[0].perguntas_index
    });
  });
});


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});