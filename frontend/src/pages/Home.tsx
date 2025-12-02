import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const instanceId = Math.random() > 0.5 ? 'AZUL' : 'VERDE';
  const bgColor = instanceId === 'AZUL' ? '#e3f2fd' : '#e8f5e9';

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', minHeight: '100vh', backgroundColor: bgColor, paddingTop: '2rem' }}>
      <h1>Bem-vindo ao sistema! [INSTÂNCIA {instanceId}]</h1>
      <p>Escolha uma opção:</p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/Login')} style={{ marginRight: '1rem' }}>
          Login
        </button>
        <button onClick={() => navigate('/register')}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Home;
