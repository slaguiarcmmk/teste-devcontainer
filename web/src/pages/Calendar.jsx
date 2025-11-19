import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';
import { toast } from 'react-toastify';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CalendarPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('auth');
            const response = await axios.get('http://localhost:3000/api/appointments', {
                headers: { Authorization: `Basic ${token}` }
            });

            const formattedEvents = response.data.map(app => ({
                title: app.title,
                start: new Date(app.date),
                end: new Date(new Date(app.date).getTime() + 60 * 60 * 1000), // 1 hora de duração
                resource: app
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error(error);
            toast.error('Erro ao carregar agendamentos');
        }
    };

    return (
        <div className="page-container">
            <h1>Minha Agenda</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default CalendarPage;
