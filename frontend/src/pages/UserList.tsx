import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  tipo: string;
  status: string;
  createdAt: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const limit = 5;
      const res = await api.get(`/users?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data.users);
      setTotalPages(Math.ceil(res.data.total / limit));
      setError('');
    } catch (err: any) {
      setError('Erro ao carregar usuários');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      setError('Erro ao excluir usuário');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>Lista de Usuários</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border={1} cellPadding={8} cellSpacing={0} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Ações</th>
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
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(u.id)} style={{ color: 'red' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span style={{ margin: '0 1rem' }}>Página {page} de {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/dashboard')}>Voltar para Dashboard</button>
      </div>
    </div>
  );
}

export default UserList;
