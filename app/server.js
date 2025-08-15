const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuração do banco de dados usando variáveis de ambiente
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Função para criar tabela se não existir
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Banco de dados inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
  }
}

// Rotas da API

// Rota principal
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API funcionando!',
    endpoints: {
      'GET /api/usuarios': 'Lista todos os usuários',
      'POST /api/usuarios': 'Cria um novo usuário',
      'GET /api/usuarios/:id': 'Busca usuário por ID',
      'DELETE /api/usuarios/:id': 'Remove usuário',
      'GET /api/status': 'Status da conexão com o banco'
    }
  });
});

// Verificar status do banco
app.get('/api/status', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'conectado',
      timestamp: result.rows[0].now,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST
    });
  } catch (error) {
    res.status(500).json({
      status: 'erro',
      mensagem: 'Não foi possível conectar ao banco de dados',
      erro: error.message
    });
  }
});

// Listar todos os usuários
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
    res.json({
      total: result.rows.length,
      usuarios: result.rows
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Buscar usuário por ID
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Criar novo usuário
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }
    
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    
    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ erro: 'Email já cadastrado' });
    } else {
      res.status(500).json({ erro: error.message });
    }
  }
});

// Deletar usuário
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    
    res.json({
      mensagem: 'Usuário removido com sucesso',
      usuario: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Iniciar servidor
app.listen(port, async () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  await initDatabase();
});