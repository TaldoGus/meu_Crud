import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/users?page=${page}&limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data.users);
        setTotal(response.data.total);
      } catch (err) {
        setError('Erro ao carregar usuários ou acesso negado');
      }
    };

    fetchUsers();
  }, [page]);

  const totalPages = Math.ceil(total / 5);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Usuários</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border={1} cellPadding={8} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.tipo}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Anterior
        </button>
        <span style={{ margin: '0 1rem' }}>
          Página {page} de {totalPages || 1}
        </span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Próxima
        </button>
      </div>

      <button onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem' }}>
        Voltar
      </button>
    </div>
  );
}

export default UserList;
