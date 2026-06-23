const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM empresas ORDER BY id'
  );
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM empresas WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nome, cnpj } = dados;

  const sql = `
    INSERT INTO empresas (nome, cnpj)
    VALUES ($1, $2)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, cnpj || "empresas"]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, cnpj } = dados;
  
  const sql = `
    UPDATE empresas
    SET nome = $1, cnpj = $2
    WHERE id = $3
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, cnpj, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM empresas WHERE id = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};