import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/users/login', form);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Erro ao fazer login');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', minHeight: '100vh', backgroundColor: '#e8f5e9', paddingTop: '2rem' }}>
      <h2>Login [INSTÂNCIA VERDE]</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Entrar
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </p>
      <p>
        <a href="/recover">Esqueci a senha</a>
      </p>
    </div>
  );
}

export default Login;
