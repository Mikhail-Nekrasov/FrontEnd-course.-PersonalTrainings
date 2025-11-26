import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { fetchTrainings, deleteTraining } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Training, Customer } from '../types';

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

  useEffect(() => {
    console.log('Trainings updated:', trainings);
  }, [trainings]);

  const handleDelete = (url: string) => {
    if (!confirm('Delete this training?')) return;
    deleteTraining(url)
      .then(() => loadTrainings())
      .catch((err) => alert(err));
  };

  if (loading) return <LoadingSpinner />;

  const columns: GridColDef<Training, any, any>[] = [
    {
      field: 'activity',
      headerName: 'Activity',
      width: 180,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      valueGetter: (params: any) => params.row?.date || '',
      valueFormatter: (params: any) =>
        params.value ? format(new Date(params.value), 'dd.MM.yyyy HH:mm') : '',
    },
    {
      field: 'duration',
      headerName: 'Duration (min)',
      width: 150,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 220,
      valueGetter: (params: any) =>
        params.row?.customer
          ? `${params.row.customer.firstname} ${params.row.customer.lastname}`
          : '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: any) =>
        params.row?._links?.self?.href ? (
          <IconButton onClick={() => handleDelete(params.row._links.self.href)} color="error">
            <DeleteIcon />
          </IconButton>
        ) : null,
    },
  ];

  return (
    <div>
      <h2>Trainings</h2>
        <div style={{ width: '100%', height: 600 }}>
        <DataGrid
          rows={trainings || []}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
          autoHeight
        />
      </div>
    </div>
  );
}
