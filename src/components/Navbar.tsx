import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{ padding: 20, display: 'flex', gap: 20 }}>
            <Link to="/customers">Customers</Link>
            <Link to="/trainings">Trainings</Link>
            <Link to="/calendar">Calendar</Link>
        </nav>
    );
}