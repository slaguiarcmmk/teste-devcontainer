import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import CalendarPage from './pages/Calendar';
import NewAppointment from './pages/NewAppointment';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem('user');
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <ToastContainer theme="dark" />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <Navbar />
                            <CalendarPage />
                        </PrivateRoute>
                    } />
                    <Route path="/new" element={
                        <PrivateRoute>
                            <Navbar />
                            <NewAppointment />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
