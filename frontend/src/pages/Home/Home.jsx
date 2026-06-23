import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { listarEmpresas, listarProdutos } from "../../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [totalEmpresas, setTotalEmpresas] = useState(null);
  const [totalProdutos, setTotalProdutos] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarMetricas() {
      try {
        const [empresas, produtos] = await Promise.all([
          listarEmpresas(),
          listarProdutos(),
        ]);
        setTotalEmpresas(empresas.length); 
        setTotalProdutos(produtos.length);
      } catch {
        setErro("Erro ao carregar métricas. Verifique se o servidor está rodando.");
      }
    }
    carregarMetricas();
  }, []);

  function handleLogout() {
    localStorage.removeItem("jwtToken");
    navigate("/");
  }

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h1>SGF</h1>
          <span>Sistema de Gestão</span>
        </div>
        <nav className={styles.nav}>
          <span className={`${styles.navItem} ${styles.active}`}>📊 Dashboard</span>
          <span className={styles.navItem} onClick={() => navigate("/empresas")}>🏢 Empresas</span>
          <span className={styles.navItem} onClick={() => navigate("/produtos")}>📦 Produtos</span>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          🚪 Sair
        </button>
      </aside>

      <main className={styles.content}>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles.subtitle}>Visão geral do sistema</p>

        {erro && <div className={styles.erro}>{erro}</div>}

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🏢</div>
            <div className={styles.cardInfo}>
              <span className={styles.cardLabel}>Empresas Cadastradas</span>
              <span className={styles.cardValue}>
                {totalEmpresas === null ? "..." : totalEmpresas}
              </span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <div className={styles.cardInfo}>
              <span className={styles.cardLabel}>Produtos Cadastrados</span>
              <span className={styles.cardValue}>
                {totalProdutos === null ? "..." : totalProdutos}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
