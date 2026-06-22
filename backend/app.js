require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(express.static('./src/public'));
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);
const { verificarToken } = require('./src/middleware/authMiddleware');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
app.use('/usuario', verificarToken, usuarioRoutes);

const produtosRoutes = require('./src/routes/produtosRoutes');
app.use('/produtos', verificarToken, produtosRoutes);

const empresaRoutes = require('./src/routes/empresaRoutes');
app.use('/empresa', verificarToken, empresaRoutes);

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API do Projeto Final SESI SENAI com PostgreSQL',
    versao: '3.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL'
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});