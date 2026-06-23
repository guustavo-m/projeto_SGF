const express = require('express');
const router = express.Router();

const ProdutosController = require('../controllers/produtosController');

router.get('/', ProdutosController.listarTodos);

router.get('/:id', ProdutosController.buscarPorId);

router.post('/', ProdutosController.criar);

router.put('/:id', ProdutosController.atualizar);

router.delete('/:id', ProdutosController.deletar);

module.exports = router;