const express = require('express');
const router = express.Router();

const EmpresaController = require('../controllers/empresaController');

router.get('/', EmpresaController.listarTodos);

router.get('/:id', EmpresaController.buscarPorId);

router.post('/', EmpresaController.criar);

router.put('/:id', EmpresaController.atualizar);

router.delete('/:id', EmpresaController.deletar);

module.exports = router;