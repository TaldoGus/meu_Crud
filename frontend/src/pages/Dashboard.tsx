import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');

      // Primeiro busca ID do usuário do token
      const tokenRes = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const id = tokenRes.data.user.userId;

      // Depois busca dados completos usando o ID
      const userRes = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userRes.data);
      setForm({
        username: userRes.data.username || '',
        email: userRes.data.email || '',
      });

    } catch (err) {
      setError('Erro ao carregar usuário');
    }
  };

  fetchUser();
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // ✅ Verificação para garantir que user.id existe
    if (!user || !user.id) {
      setError('Usuário não carregado');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.put(`/users/${user.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Dados atualizados com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {user ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Usuário:</label>
            <input
              name="username"
              value={form.username || ''} 
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={form.email || ''} 
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>
            Atualizar
          </button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/users')} style={{ marginRight: '1rem' }}>
          Ver usuários (admin)
        </button>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default Dashboard;
