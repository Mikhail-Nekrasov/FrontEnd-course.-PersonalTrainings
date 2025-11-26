import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { fetchTrainings, deleteTraining } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Training } from '../types';


export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTrainings = () => {
    setLoading(true);
    fetchTrainings()
      .then((data) => setTrainings(data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTrainings();
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm('Delete this training?')) return;
    deleteTraining(id)
      .then(() => loadTrainings())
      .catch((err) => alert(err));
  };

  if (loading) return <LoadingSpinner />;

  const rows = trainings.map((t) => ({
    id: t.id,
    activity: t.activity,
    date: t.date ? format(new Date(t.date), 'dd.MM.yyyy HH:mm') : '',
    duration: t.duration,
    customerName: t.customer
      ? `${t.customer.firstname} ${t.customer.lastname}`
      : '',
  }));

  const columns: GridColDef[] = [
    { field: 'activity', headerName: 'Activity', width: 180 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'duration', headerName: 'Duration (min)', width: 150 },
    { field: 'customerName', headerName: 'Customer', width: 220 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)} color="error">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%', maxWidth: 860, marginLeft: 20 }}>
      <h2>Trainings</h2>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
          autoHeight
        />
      </div>
    </div>
  );
}
