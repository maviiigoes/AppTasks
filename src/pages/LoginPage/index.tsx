import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./login.css"
interface LoginPageProps {
  next?: string;
}

export function LoginPage({ next = '/' }: LoginPageProps) {
  const { signin, isAuthenticated } = useAuth();
  const [error, setError] = useState<string>("");

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    if (username === 'Maria' && password === '1234') {
      signin({ username });
      setError('');
    } else {
      setError('Usuário e/ou senha incorretos!');
    }
  };

  if (isAuthenticated) {
    return <Navigate to={next} />;
  }

  return (
    <main className="LoginCSS">
      <h2>Login Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLoginSubmit}>
        <input type="text" placeholder="Username" ref={usernameInputRef} />
        <input type="password" placeholder="Senha" ref={passwordInputRef} />
        <input type="submit" value="Entrar" />
      </form>
    </main>
  );
}