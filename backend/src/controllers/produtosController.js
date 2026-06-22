const ProdutosModel = require('../models/produtosModel');

async function listarTodos(req, res) {
  try {
    const produtos = await ProdutosModel.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar produtos', 
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
    
    const produto = await ProdutosModel.buscarPorId(id);
    
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ 
        mensagem: `Produto ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar produto',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, preco, quantidade_estoque, empresa_id } = req.body;
    
    if (!nome || !preco || !quantidade_estoque || !empresa_id) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novoProduto = await ProdutosModel.criar({ 
      nome,
      preco,
      quantidade_estoque,
      empresa_id
    });
    
    res.status(201).json(novoProduto);

  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar produto',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, preco, quantidade_estoque, empresa_id } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nome || !preco || !quantidade_estoque || !empresa_id) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const produtoAtualizado = await ProdutosModel.atualizar(id, { 
      nome,
      preco,
      quantidade_estoque,
      empresa_id
    });
    
    if (produtoAtualizado) {
      res.status(200).json(produtoAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Produto ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar produto',
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
    
    const deletado = await ProdutosModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Produto ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Produto ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar produto',
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