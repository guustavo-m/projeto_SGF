import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import API_URL from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  async function handleLogin(event) {
    event.preventDefault();
    if (!email || !senha) {
      showMessage("Preencha e-mail e senha.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.mensagem || "Falha no login");
      }
      const data = await response.json();
      localStorage.setItem("jwtToken", data.token);
      navigate("/home");
    } catch (error) {
      showMessage(error.message);
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Projeto final SGF</h1>
        </div>
      </header>

      <main className={styles.mainContainer}>
        <section className={styles.loginSection}>
          <h2>LOGIN</h2>
          <p className={styles.subtitle}>
            Faça login para acessar sua conta.
          </p>

          <div className={styles.message}>
            {message}
          </div>
          <form onSubmit={handleLogin}>
            <div className={styles.formRow}>
              <label htmlFor="email">
                E-MAIL
              </label>

              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="senha">
                SENHA
              </label>

              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                required
              />
            </div>

            <div className={styles.buttonRow}>
              <button type="submit">
                Entrar
              </button>
            </div>

            <div className={styles.loginLink}>
              <span>
                Ainda não possui conta?
              </span>

              <Link to="#">
                Criar conta
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}