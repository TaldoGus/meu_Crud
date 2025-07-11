import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Bem-vindo ao sistema!</h1>
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
