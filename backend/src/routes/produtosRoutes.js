const express = require('express');
const router = express.Router();

const ProdutosController = require('../controllers/produtosController');
const { verificarToken } = require('../middleware/authMiddleware');

router.get('/', verificarToken, ProdutosController.listarTodos);

router.get('/:id', verificarToken, ProdutosController.buscarPorId);

router.post('/', verificarToken, ProdutosController.criar);

router.put('/:id', verificarToken, ProdutosController.atualizar);

router.delete('/:id', verificarToken, ProdutosController.deletar);

module.exports = router;