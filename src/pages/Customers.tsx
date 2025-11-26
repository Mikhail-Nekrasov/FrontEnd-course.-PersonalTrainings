import { useEffect, useState } from 'react';
import { fetchCustomers, deleteCustomer } from '../api';
import AddCustomer from '../components/AddCustomer';
import LoadingSpinner from '../components/LoadingSpinner';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { Customer } from '../types';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'First Name', width: 150 },
    { field: 'lastname', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'streetaddress', headerName: 'Address', width: 200 },
    { field: 'postcode', headerName: 'Postcode', width: 100 },
    { 
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDelete(params.row._links.self.href)} color="error">
            <DeleteIcon />
          </IconButton>
          <Link to={`/trainings/add/${encodeURIComponent(params.row._links.self.href)}`} style={{ marginLeft: 8 }}>
            Add Training
          </Link>
        </>
      )
    }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Customers</h2>
      <AddCustomer onAdded={loadCustomers} />
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={row => row._links.self.href}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
        />
      </div>
    </div>
  );
}
