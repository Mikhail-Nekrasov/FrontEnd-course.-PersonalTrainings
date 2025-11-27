import { useEffect, useState } from 'react';
import { addCustomer, fetchCustomers, deleteCustomer } from '../api';
import AddCustomer from '../components/AddCustomer';
import ExportCSV from "../components/ExportCSV";
import LoadingSpinner from '../components/LoadingSpinner';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { Customer } from '../types';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Customer
  const [newCustomer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: ""
  });


  // Edit customer
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCustomer, setEditedCustomer] = useState<any>({});


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

  const handleAddCustomer = async () => {
    try {
      await addCustomer(newCustomer);
      loadCustomers(); 
      setNewCustomer({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
      });
    } catch (err: any) {
      alert(err);
    }
  };


  // Editing added
  function startEdit(row: any) {
    setEditingId(row._links.self.href);
    setEditedCustomer({ ...row });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditedCustomer({});
  }

  async function saveEdit() {
    try {
      const url = editingId!;
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedCustomer)
      });

      setEditingId(null);
      setEditedCustomer({});
      loadCustomers();
    } catch (err: any) {
      alert(err);
    }
  }

  const EditableCell = (params: any, field: string) => {
    if (editingId === params.row._links.self.href) {
      return (
        <input
          value={editedCustomer[field] ?? ''}
          style={{ width: '95%' }}
          onChange={e => setEditedCustomer({ ...editedCustomer, [field]: e.target.value })}
        />
      );
    }
    return params.row[field];
  };


  const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'First Name', width: 150, renderCell: params => EditableCell(params, 'firstname') },
    { field: 'lastname', headerName: 'Last Name', width: 150, renderCell: params => EditableCell(params, 'lastname') },
    { field: 'email', headerName: 'Email', width: 200, renderCell: params => EditableCell(params, 'email') },
    { field: 'phone', headerName: 'Phone', width: 150, renderCell: params => EditableCell(params, 'phone') },
    { field: 'streetaddress', headerName: 'Address', width: 200, renderCell: params => EditableCell(params, 'streetaddress') },
    { field: 'postcode', headerName: 'Postcode', width: 100, renderCell: params => EditableCell(params, 'postcode') },
    { 
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const rowUrl = params.row._links.self.href;
        const isEditing = editingId === rowUrl;

        if (isEditing) {
          return (
            <>
              <IconButton onClick={saveEdit} color="success">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={cancelEdit} color="error">
                <CloseIcon />
              </IconButton>
            </>
          );
        }

        return (
          <>
            <IconButton onClick={() => startEdit(params.row)} color="primary">
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => handleDelete(rowUrl)} color="error">
              <DeleteIcon />
            </IconButton>

            <Link
              to={`/trainings/add/${encodeURIComponent(rowUrl)}`}
              style={{ marginLeft: 8 }}
            >
              Add Training
            </Link>
          </>
        );
      }
    }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ height: 600, width: '100%', maxWidth: 1200, marginLeft: 20 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2>Customers</h2>

        <ExportCSV
          data={customers}
          filename="customers.csv"
          columns={[
            "firstname",
            "lastname",
            "email",
            "phone",
            "streetaddress",
            "postcode",
            "city"
          ]}
        />

      </div>


        <AddCustomer
          newCustomer={newCustomer}
          setNewCustomer={setNewCustomer}
          onAdd={handleAddCustomer}
        />
      <div style={{ height: 420, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={row => row._links.self.href}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
        />

      </div>
    </div>
  );
}
