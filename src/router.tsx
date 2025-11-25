import { Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import Trainings from './pages/Trainings';
import CustomerDetails from './pages/CustomerDetails';
import TrainingDetails from './pages/TrainingDetails';
import NotFound from './pages/NotFound';

export default function Router() {
    return (
        <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />

        <Route path="/trainings" element={<Trainings />} />
        <Route path="/trainings/:id" element={<TrainingDetails />} />

        <Route path="*" element={<NotFound />} />
        </Routes>
    );
}