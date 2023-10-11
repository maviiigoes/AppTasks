import { BrowserRouter, Route, Routes, Link,  } from 'react-router-dom';
import  { useMemo } from 'react';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePages';
import { NotFoundPage } from './pages/NotFound';
import { TaskPage } from './pages/TaskPage';
import { useAuth } from './contexts/AuthContext';
import { TasksPage } from './pages/TasksPage';
import './App.css';

function App() {
  const { signout, isAuthenticated, user } = useAuth();

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ? (
        <p>
          {user?.username}
          <button onClick={() => { signout() }}>Sair</button>
        </p>
      ) : (
        <p>Olá Visitante!</p>
      )
    );
  }, [isAuthenticated]);




  
  return (
    <BrowserRouter>
      <header>
        <h1>Tasks App</h1>
        <span>{authBlock}</span>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TasksPage />}>
          <Route path=":id" element={<TaskPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer>
        <p>Fim por fim feito por mim!</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
