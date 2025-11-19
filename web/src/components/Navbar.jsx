import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/">Minha Agenda</Link>
            <Link to="/new">Novo Agendamento</Link>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span>Olá, {user.username}</span>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </nav>
    );
};

export default Navbar;
