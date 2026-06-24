const express = require('express');
const router = express.Router();

const EmpresaController = require('../controllers/empresaController');
const { verificarToken } = require('../middleware/authMiddleware');

router.get('/', verificarToken, EmpresaController.listarTodos);

router.get('/:id', verificarToken, EmpresaController.buscarPorId);

router.post('/', verificarToken, EmpresaController.criar);

router.put('/:id', verificarToken, EmpresaController.atualizar);

router.delete('/:id', verificarToken, EmpresaController.deletar);

module.exports = router;