const EmpresaModel = require('../models/empresaModel');

async function listarTodos(req, res) {
  try {
    const empresas = await EmpresaModel.listarTodos();
    res.status(200).json(empresas);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar empresas', 
      erro: erro.message 
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const empresa = await EmpresaModel.buscarPorId(id);
    
    if (empresa) {
      res.status(200).json(empresa);
    } else {
      res.status(404).json({ 
        mensagem: `Empresa ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar empresa',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, cnpj } = req.body;
    
    if (!nome || !cnpj) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novaEmpresa = await EmpresaModel.criar({ 
      nome,
      cnpj
    });
    
    res.status(201).json(novaEmpresa);

  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar empresa',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cnpj } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nome || !cnpj) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const empresaAtualizada = await EmpresaModel.atualizar(id, { 
      nome,
      cnpj
    });
    
    if (empresaAtualizada) {
      res.status(200).json(empresaAtualizada);
    } else {
      res.status(404).json({ 
        mensagem: `Empresa ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar empresa',
      erro: erro.message 
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await EmpresaModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Empresa ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Empresa ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar empresa',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};