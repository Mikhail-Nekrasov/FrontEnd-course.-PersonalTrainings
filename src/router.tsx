import { Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import Trainings from './pages/Trainings';
import NotFound from './pages/NotFound';
import AddTraining from './components/AddTraining';
import Calendar from './pages/Calendar';
import Statistics from "./pages/Statistics";


export default function Router() {
    return (
        <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/customers" element={<Customers />} />

        <Route path="/trainings" element={<Trainings />} />
        <Route path="/trainings/add/:customerUrl" element={<AddTraining />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/statistics" element={<Statistics />} />


        <Route path="*" element={<NotFound />} />
        </Routes>
    );
}