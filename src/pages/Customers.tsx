import { useEffect, useState } from 'react';
import { fetchCustomers, deleteCustomer } from '../api';
import CustomerTable from '../components/CustomerTable';
import AddCustomer from '../components/AddCustomer';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Customer } from '../types';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  function loadCustomers() {
    setLoading(true);
    fetchCustomers()
      .then(data => {
        setCustomers(data._embedded.customers);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  function handleDelete(url: string) {
    if (!confirm('Delete this customer and all trainings?')) return;
    deleteCustomer(url)
      .then(() => loadCustomers())
      .catch(err => alert(err));
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Customers</h1>
      <AddCustomer onAdded={loadCustomers} />
      <CustomerTable customers={customers} onDelete={handleDelete} />
    </div>
  );
}
