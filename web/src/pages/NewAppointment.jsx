import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewAppointment = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('auth');
            await axios.post('http://localhost:3000/api/appointments', {
                title,
                date,
                description
            }, {
                headers: { Authorization: `Basic ${token}` }
            });

            toast.success('Agendamento criado com sucesso!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao criar agendamento');
        }
    };

    return (
        <div className="page-container">
            <h1>Novo Agendamento</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Data e Hora</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default NewAppointment;
