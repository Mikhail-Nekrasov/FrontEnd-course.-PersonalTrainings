import { useEffect, useState } from 'react';
import { fetchTrainings } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Training } from '../types';

export default function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        fetchTrainings()
            .then(data => setTrainings(data))
            .finally(() => setLoading(false));
    }

    useEffect(() => { load(); }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h1>Trainings</h1>
            <ul>
                {trainings.map(t => (
                    <li key={t.id}>{t.date} — {t.activity}</li>
                ))}
            </ul>
        </div>
    );
}