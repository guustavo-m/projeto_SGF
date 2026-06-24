import { useState, useEffect } from "react";

import {
  listarEmpresas,
  listarProdutos,
  criarEmpresa,
  atualizarEmpresa,
  deletarEmpresa,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from "../../services/api";

// ─── Modais ───────────────────────────────────────────────────────
function ModalEmpresa({ empresa, onSave, onClose }) {
  const [form, setForm] = useState(
    empresa || {
      nome: "",
      cnpj: ""
    }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <p style={styles.modalTitle}>{empresa ? "Editar empresa" : "Nova empresa"}</p>
          <button onClick={onClose} style={styles.modalClose}>✕</button>
        </div>
        <div style={styles.modalBody}>
          {[["Nome", "nome"], ["CNPJ", "cnpj"]].map(([label, key]) => (
            <div key={key} style={styles.field}>
              <label style={styles.fieldLabel}>{label}</label>
              <input
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                style={styles.input}
              />
            </div>
          ))}
        </div>
        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
          <button onClick={() => onSave(form)} style={styles.btnPrimary}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

function ModalProduto({ produto, empresas, onSave, onClose }) {
  const [form, setForm] = useState(
    produto || {
      nome: "",
      preco: 0,
      quantidade_estoque: 0,
      empresa_id: empresas[0]?.id || ""
    }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <p style={styles.modalTitle}>{produto ? "Editar produto" : "Novo produto"}</p>
          <button onClick={onClose} style={styles.modalClose}>✕</button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.field}>
            <label style={styles.fieldLabel}>Nome</label>
            <input value={form.nome} onChange={(e) => set("nome", e.target.value)} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.fieldLabel}>Empresa</label>
            <select
              value={form.empresa_id}
              onChange={(e) =>
                set("empresa_id", Number(e.target.value))
              }
            >
              {empresas.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={styles.field}>
              <label style={styles.fieldLabel}>Estoque</label>
              <input
                type="number"
                value={form.quantidade_estoque}
                onChange={(e) =>
                  set(
                    "quantidade_estoque",
                    Number(e.target.value)
                  )
                }
              />
            </div>
            <div style={styles.field}>
              <label style={styles.fieldLabel}>Preço (R$)</label>
              <input type="number" value={form.preco} onChange={(e) => set("preco", Number(e.target.value))} style={styles.input} />
            </div>
          </div>
        </div>
        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
          <button onClick={() => onSave(form)} style={styles.btnPrimary}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

// ─── Página Empresas ──────────────────────────────────────────────
function PageEmpresas({ empresas, setEmpresas }) {
  const [busca, setBusca] = useState("");
  const [modal, setModal] = useState(null); // null | "nova" | empresa obj

  const filtradas = empresas.filter(
    (e) =>
      e.nome.toLowerCase().includes(
        busca.toLowerCase()
      ) ||
      e.cnpj.toLowerCase().includes(
        busca.toLowerCase()
      )
  );

  async function salvar(form) {
  try {
    if (modal === "nova") {

      const novaEmpresa =
        await criarEmpresa({
          nome: form.nome,
          cnpj: form.cnpj,
        });

      setEmpresas((prev) => [
        ...prev,
        novaEmpresa
      ]);

    } else {

      const empresaAtualizada =
        await atualizarEmpresa(
          modal.id,
          {
            nome: form.nome,
            cnpj: form.cnpj,
          }
        );

      setEmpresas((prev) =>
        prev.map((e) =>
          e.id === modal.id
            ? empresaAtualizada
            : e
        )
      );
    }

    setModal(null);

  } catch (erro) {

    console.error(erro);

    alert("Erro ao salvar empresa");
  }
}

  async function excluir(id) {

  if (!confirm("Excluir esta empresa?"))
    return;

  try {

    await deletarEmpresa(id);

    setEmpresas((prev) =>
      prev.filter((e) => e.id !== id)
    );

  } catch (erro) {

    console.error(erro);

    alert("Erro ao excluir empresa");
  }
}

  return (
    <div style={styles.pageWrap}>
      {modal && (
        <ModalEmpresa
          empresa={modal === "nova" ? null : modal}
          onSave={salvar}
          onClose={() => setModal(null)}
        />
      )}

      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Empresas</h2>
          <p style={styles.pageSub}>Fornecedores cadastrados no sistema</p>
        </div>
        <button onClick={() => setModal("nova")} style={styles.btnPrimary}>
          + Nova empresa
        </button>
      </div>

      <div style={styles.card}>
        <input
          placeholder="Buscar por nome ou CNPJ..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ ...styles.input, marginBottom: 16 }}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              {["Empresa", "CNPJ", ""].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtradas.length === 0 && (
              <tr><td colSpan={3} style={{ ...styles.td, color: "#888", textAlign: "center" }}>Nenhuma empresa encontrada.</td></tr>
            )}
            {filtradas.map((e) => (
              <tr key={e.id}>
                <td style={{ ...styles.td, fontWeight: 500 }}>{e.nome}</td>
                <td style={styles.td}>{e.cnpj}</td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setModal(e)} style={styles.btnIcon}>✏️</button>
                    <button onClick={() => excluir(e.id)} style={styles.btnIcon}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Página Produtos ──────────────────────────────────────────────
function PageProdutos({ produtos, setProdutos, empresas }) {
  const [busca, setBusca] = useState("");
  const [modal, setModal] = useState(null);

  const filtrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(
        busca.toLowerCase()
      )
  );

  async function salvar(form) {

  try {

    if (modal === "novo") {

      console.log({
        nome: form.nome,
        preco: form.preco,
        quantidade_estoque: form.estoque,
        empresa_id: form.empresaId,
      });

      const novoProduto =
        await criarProduto({
          nome: form.nome,
          preco: form.preco,
          quantidade_estoque: form.quantidade_estoque,
          empresa_id: form.empresa_id,
        });

        setProdutos((prev) => [
          ...prev,
          {
            id: novoProduto.id,
            nome: novoProduto.nome,
            preco: Number(novoProduto.preco),
            quantidade_estoque: novoProduto.quantidade_estoque,
            empresa_id: novoProduto.empresa_id,
          }
        ]);

    } else {

      const produtoAtualizado =
        await atualizarProduto(
          modal.id,
          {
            nome: form.nome,
            preco: form.preco,
            quantidade_estoque: form.quantidade_estoque,
            empresa_id: form.empresa_id,
          }
        );

      setProdutos((prev) =>
        prev.map((p) =>
          p.id === modal.id
            ? {
                id: produtoAtualizado.id,
                nome: produtoAtualizado.nome,
                preco: Number(produtoAtualizado.preco),
                estoque:
                  produtoAtualizado.quantidade_estoque,
                empresaId:
                  produtoAtualizado.empresa_id,
              }
            : p
        )
      );
    }

    setModal(null);

  } catch (erro) {

    console.error(erro);

    alert("Erro ao salvar produto");
  }
}

  async function excluir(id) {

  if (!confirm("Excluir este produto?"))
    return;

  try {

    await deletarProduto(id);

    setProdutos((prev) =>
      prev.filter((p) => p.id !== id)
    );

  } catch (erro) {

    console.error(erro);

    alert("Erro ao excluir produto");
  }
}

  const nomeEmpresa = (id) =>
  empresas.find(
    (e) =>
      Number(e.id) === Number(id)
  )?.nome ?? "—";

  return (
    <div style={styles.pageWrap}>
      {modal && (
        <ModalProduto
          produto={modal === "novo" ? null : modal}
          empresas={empresas}
          onSave={salvar}
          onClose={() => setModal(null)}
        />
      )}

      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Produtos</h2>
          <p style={styles.pageSub}>Produtos vinculados às empresas fornecedoras</p>
        </div>
        <button onClick={() => setModal("novo")} style={styles.btnPrimary}>
          + Novo produto
        </button>
      </div>

      <div style={styles.card}>
        <input
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ ...styles.input, marginBottom: 16 }}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              {["Produto", "Empresa", "Estoque", "Preço", ""].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 && (
              <tr><td colSpan={5} style={{ ...styles.td, color: "#888", textAlign: "center" }}>Nenhum produto encontrado.</td></tr>
            )}
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td
                  style={{
                    ...styles.td,
                    fontWeight: 500
                  }}
                >
                  {p.nome}
                </td>

                <td style={styles.td}>
                  {nomeEmpresa(
                    p.empresa_id
                  )}
                </td>

                <td style={styles.td}>
                  {p.quantidade_estoque}
                </td>

                <td style={styles.td}>
                  R$ {Number(
                    p.preco
                  ).toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits: 2
                    }
                  )}
                </td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setModal(p)} style={styles.btnIcon}>✏️</button>
                    <button onClick={() => excluir(p.id)} style={styles.btnIcon}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── App principal ────────────────────────────────────────────────
export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [empresas, setEmpresas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
  carregarDados();
}, []);

async function carregarDados() {
  try {
    const empresasDB = await listarEmpresas();
    const produtosDB = await listarProdutos();

    setEmpresas(empresasDB);

    setProdutos(
      produtosDB.map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
        quantidade_estoque: produto.quantidade_estoque,
        empresa_id: produto.empresa_id,
      }))
    );
  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
  }
}

useEffect(() => {
  carregarDados();
}, []);

  // Métricas calculadas dinamicamente
  const counts = {
    empresas: empresas.length,
    produtos: produtos.length,
    estoque: produtos.reduce(
      (s, p) => s + Number(p.estoque || 0),
      0
    ),
    ativos: produtos.length
  };

  const metrics = [
    { id: "empresas", label: "Empresas", icon: "🏢", accent: "#1a7a42" },
    { id: "produtos", label: "Produtos", icon: "📦", accent: "#185FA5" }
  ];

  async function handleRefresh() {
    if (refreshing) return;

    setRefreshing(true);

    await carregarDados();

    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  }

  function sair() {

  localStorage.removeItem("token");

  window.location.href = "/";
}

  return (
    <div style={styles.app}>
      {/* Navbar — igual ao original */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <div style={styles.navLogo}>📦</div>
          <div>
            <p style={styles.navBrandName}>Sistema de Gestão</p>
            <p style={styles.navBrandSub}>Fornecimento</p>
          </div>
        </div>

        <div style={styles.navLinks}>
          {["dashboard", "empresas", "produtos"].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              style={{
                ...styles.navLink,
                ...(activePage === page ? styles.navLinkActive : {}),
              }}
            >
              {page === "dashboard" && "📊 "}
              {page === "empresas" && "🏢 "}
              {page === "produtos" && "📦 "}
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>

        <button style={styles.navExit} onClick={sair}>↩ Sair</button>
      </nav>

      {/* Páginas */}
      {activePage === "dashboard" && (
        <main style={styles.main}>
          {/* Hero card — igual ao original */}
          <div style={styles.heroCard}>
            <p style={styles.eyebrow}>Dashboard SGF</p>
            <h1 style={styles.heroTitle}>
              Gestão de fornecedores<br />e produtos
            </h1>
            <p style={styles.heroDesc}>
              Controle empresas fornecedoras, cadastre produtos vinculados a cada
              empresa e acompanhe o estoque geral do sistema.
            </p>
          </div>

          {/* Métricas — calculadas dinamicamente */}
          <div style={styles.metricsGrid}>
            {metrics.map((m) => (
              <div key={m.id} style={{ ...styles.metricCard, borderTopColor: m.accent }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{m.icon}</div>
                <p style={styles.metricLabel}>{m.label}</p>
                <p style={styles.metricValue}>{counts[m.id]}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {activePage === "empresas" && (
        <PageEmpresas empresas={empresas} setEmpresas={setEmpresas} />
      )}

      {activePage === "produtos" && (
        <PageProdutos produtos={produtos} setProdutos={setProdutos} empresas={empresas} />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        table tr:hover td { background: #fafaf8; }
      `}</style>
    </div>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────
const styles = {
  // originais preservados
  app: { minHeight: "100vh", backgroundColor: "#f5f5f3", fontFamily: "system-ui, sans-serif" },
  nav: { backgroundColor: "#ffffff", borderBottom: "0.5px solid rgba(0,0,0,0.1)", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" },
  navBrand: { display: "flex", alignItems: "center", gap: 10 },
  navLogo: { width: 36, height: 36, backgroundColor: "#f5f5f3", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  navBrandName: { fontSize: 14, fontWeight: 500, margin: 0, lineHeight: 1.2 },
  navBrandSub: { fontSize: 11, color: "#888", margin: 0, lineHeight: 1.2 },
  navLinks: { display: "flex", alignItems: "center", gap: 4 },
  navLink: { display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 14, color: "#666", cursor: "pointer", border: "none", background: "transparent" },
  navLinkActive: { backgroundColor: "#e8f5ee", color: "#1a6b3c", fontWeight: 500, border: "0.5px solid #b8dfc9" },
  navExit: { display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 14, color: "#666", cursor: "pointer", border: "0.5px solid rgba(0,0,0,0.1)", background: "transparent" },
  main: { padding: 24, maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 },
  heroCard: { backgroundColor: "#ffffff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 32 },
  eyebrow: { fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: "#888", textTransform: "uppercase", marginBottom: 10 },
  heroTitle: { fontSize: 32, fontWeight: 700, color: "#111", lineHeight: 1.15, marginBottom: 12 },
  heroDesc: { fontSize: 15, color: "#666", lineHeight: 1.6, marginBottom: 24, maxWidth: 520 },
  userBox: { border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: "16px 20px" },
  userLabel: { fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888", marginBottom: 4 },
  userEmail: { fontSize: 15, fontWeight: 500, color: "#111", marginBottom: 14 },
  btnRefresh: { width: "100%", padding: 11, backgroundColor: "#f0faf5", border: "0.5px solid #c5e8d4", borderRadius: 8, color: "#1a6b3c", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  metricsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  metricCard: { backgroundColor: "#ffffff", borderRadius: 12, padding: 20, borderTop: "3px solid transparent", borderLeft: "0.5px solid rgba(0,0,0,0.08)", borderRight: "0.5px solid rgba(0,0,0,0.08)", borderBottom: "0.5px solid rgba(0,0,0,0.08)" },
  metricLabel: { fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888", marginBottom: 4 },
  metricValue: { fontSize: 28, fontWeight: 700, color: "#111", lineHeight: 1 },

  // novos — páginas internas
  pageWrap: { padding: 24, maxWidth: 1000, margin: "0 auto" },
  pageHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 },
  pageTitle: { fontSize: 22, fontWeight: 700, color: "#111", margin: 0 },
  pageSub: { fontSize: 13, color: "#888", margin: "4px 0 0" },
  card: { backgroundColor: "#ffffff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 20 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: { textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "0.5px solid rgba(0,0,0,0.08)" },
  td: { padding: "11px 10px", color: "#222", borderBottom: "0.5px solid rgba(0,0,0,0.06)" },
  input: { width: "100%", padding: "8px 12px", fontSize: 14, border: "0.5px solid rgba(0,0,0,0.15)", borderRadius: 8, outline: "none", fontFamily: "system-ui, sans-serif", boxSizing: "border-box", backgroundColor: "#fff", color: "#111" },
  field: { marginBottom: 12 },
  fieldLabel: { display: "block", fontSize: 11, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 },
  btnPrimary: { padding: "8px 16px", backgroundColor: "#e8f5ee", border: "0.5px solid #b8dfc9", borderRadius: 8, color: "#1a6b3c", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnSecondary: { padding: "8px 16px", backgroundColor: "transparent", border: "0.5px solid rgba(0,0,0,0.15)", borderRadius: 8, color: "#444", fontSize: 14, cursor: "pointer" },
  btnIcon: { padding: "4px 8px", background: "transparent", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 6, cursor: "pointer", fontSize: 14 },
  badgeGreen: { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, backgroundColor: "#e8f5ee", color: "#1a6b3c" },
  badgeRed: { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, backgroundColor: "#fdecea", color: "#a32d2d" },

  // modal
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { backgroundColor: "#fff", borderRadius: 12, width: 440, maxWidth: "90vw", border: "0.5px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" },
  modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "0.5px solid rgba(0,0,0,0.08)" },
  modalTitle: { fontSize: 15, fontWeight: 600, color: "#111", margin: 0 },
  modalClose: { background: "transparent", border: "none", fontSize: 16, cursor: "pointer", color: "#888" },
  modalBody: { padding: "20px 20px 8px" },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: 8, padding: "12px 20px 16px" },
};
