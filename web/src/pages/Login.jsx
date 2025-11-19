import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic Auth credentials
        const token = btoa(`${username}:${password}`);

        try {
            // Tenta listar agendamentos para validar credenciais
            // (Ou poderia ter um endpoint específico de /me, mas vamos usar o que temos)
            await axios.get('http://localhost:3000/api/appointments', {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });

            localStorage.setItem('user', JSON.stringify({ username }));
            localStorage.setItem('auth', token);
            toast.success('Login realizado com sucesso!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Credenciais inválidas');
        }
    };

    return (
        <div className="page-container login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            <p>Use admin / admin</p>
        </div>
    );
};

export default Login;
