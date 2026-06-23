const pool = require('../config/database');
const bcrypt = require('bcrypt');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM usuarios ORDER BY id'
  );
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function buscarPorEmail(email) {
  const resultado = await pool.query(
    `SELECT * FROM usuarios WHERE email = $1`,
    [email]
  );

  return resultado.rows[0];
}

async function criar(dados) {
  const { email, senha } = dados;

  const senhaHash = await bcrypt.hash(senha, 10);

  const result = await pool.query(
    `
      INSERT INTO usuarios (email, senha)
      VALUES ($1, $2)
      RETURNING *
    `,
    [email, senhaHash]
  );

  return result.rows[0];
}


async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM usuarios WHERE id = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  deletar
};