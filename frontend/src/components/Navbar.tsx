import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#222', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Início</Link>
        {token && (
          <>
            <Link to="/dashboard" style={{ color: '#fff', marginRight: '1rem' }}>Dashboard</Link>
            <Link to="/users" style={{ color: '#fff', marginRight: '1rem' }}>Usuários</Link>
          </>
        )}
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>Cadastro</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
