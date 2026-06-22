import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main className={styles.main}>
        <section className={styles.content}>
          <h2>
            DOMINE A FÍSICA PARA O
            <br />
            VESTIBULAR
          </h2>
          <p>
            Acesse questões organizadas por
            vestibular e tópicos. Pratique e
            aprimore seus conhecimentos.
          </p>

          <button className={styles.btnSearch}>
            <Link className={styles.btnSearchA} to="/questoes">
              Buscar questões
            </Link>
          </button>
        </section>

        <section className={styles.cards}>
          <div className={styles.card}>
            <h3>
              Treine Física de Verdade
            </h3>
            <p>
              Questões dos vestibulares pra você
              praticar sem parar.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Busca Avançada</h3>
            <p>
              Filtre por vestibular e tópico e
              encontre exatamente o conteúdo
              que precisa estudar.
            </p>
          </div>

          <div className={styles.card}>
            <h3>
              Acompanhe sua evolução
            </h3>
            <p>
              Monitore seus resultados e evolua
              com estratégia.
            </p>
          </div>
        </section>

        <section className={styles.bottom}>
          <h3>Pronto para começar?</h3>
          <p>
            Se naquela questão você esqueceu
            como faz, veja as fórmulas.
          </p>

          <button className={styles.btnSearch}>
            <Link
              className={styles.btnFormulasA}
              to="/formulas">
              Veja as Fórmulas
            </Link>
          </button>
        </section>
      </main>
    </>
  );
}