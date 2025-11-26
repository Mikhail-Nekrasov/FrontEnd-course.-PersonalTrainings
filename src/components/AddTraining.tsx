import { useState, useEffect } from 'react';
import { addTraining, fetchCustomers } from '../api';
import type { Customer, Training } from '../types';

export default function AddTraining({ onAdded }: { onAdded: () => void }) {
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers()
      .then((data) => setCustomers(data?._embedded?.customers || []))
      .catch(console.error);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activity || !date || !duration || !customerId) return alert('All fields are required');

    const customer = customers.find((c) => c._links.self.href === customerId);
    if (!customer) return alert('Invalid customer');

    const newTraining: Partial<Training> = {
      activity,
      date,
      duration: Number(duration),
      customer,
    };

    addTraining(newTraining)
      .then(() => {
        onAdded();
        setActivity('');
        setDate('');
        setDuration('');
        setCustomerId('');
      })
      .catch(console.error);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (min)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
        <option value="">Select customer</option>
        {customers.map((c) => (
          <option key={c._links.self.href} value={c._links.self.href}>
            {c.firstname} {c.lastname}
          </option>
        ))}
      </select>
      <button type="submit">Add Training</button>
    </form>
  );
}
