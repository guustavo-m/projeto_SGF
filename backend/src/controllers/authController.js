const UsuarioModel = require('../models/UsuarioModel');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: 'Email e senha são obrigatórios'
    });
  }

  try {

    const usuario = await UsuarioModel.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        mensagem: 'Usuário não encontrado'
      });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({
        mensagem: 'Senha incorreta'
      });
    }

    const payload = {
      id: usuario.id,
      email: usuario.email
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    res.status(200).json({
      token
    });

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao realizar login',
      erro: erro.message
    });

  }
}

module.exports = {
  login
};
