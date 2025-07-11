import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Recover() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await api.post('/users/recover', { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setError('Erro ao enviar recuperação');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Recuperar Senha</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Enviar recuperação</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/')}>Voltar</button>
      </div>
    </div>
  );
}

export default Recover;
