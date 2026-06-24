const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ─── EMPRESAS ────────────────────────────────────────────────────────────────

export async function listarEmpresas() {
  const res = await fetch(`${API_URL}/empresa`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao listar empresas");
  return res.json();
}

export async function criarEmpresa(dados) {
  const res = await fetch(`${API_URL}/empresa`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao criar empresa");
  return res.json();
}

export async function atualizarEmpresa(id, dados) {
  const res = await fetch(`${API_URL}/empresa/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar empresa");
  return res.json();
}

export async function deletarEmpresa(id) {
  const res = await fetch(`${API_URL}/empresa/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao deletar empresa");
  return res.json();
}

// ─── PRODUTOS ────────────────────────────────────────────────────────────────

export async function listarProdutos() {
  const res = await fetch(`${API_URL}/produtos`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao listar produtos");
  return res.json();
}

export async function criarProduto(dados) {
  const res = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
  const erro = await res.json();
  console.log("ERRO BACKEND:", erro);
  throw new Error(JSON.stringify(erro));
}
  return res.json();
}

export async function atualizarProduto(id, dados) {
  const res = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(dados),
  });
    if (!res.ok) {
  const erro = await res.json();
  console.log("ERRO BACKEND:", erro);
  throw new Error(JSON.stringify(erro));
}
  return res.json();
}

export async function deletarProduto(id) {
  const res = await fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao deletar produto");
  return res.json();
}

export default API_URL;
