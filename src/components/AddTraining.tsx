import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addTraining } from '../api';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { enGB } from 'date-fns/locale';

export default function AddTraining() {
  const { customerUrl } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState<Date | null>(new Date());
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');

  async function handleSave() {
    if (!date) return alert('Please select a date');

    const training = {
      date: date.toISOString(),
      activity,
      duration: Number(duration),
      customer: decodeURIComponent(customerUrl!)
    };

    try {
      await addTraining(training);
      navigate('/trainings');
    } catch (err: any) {
      alert(err);
    }
  }

  return (
    <Paper
      sx={{
        maxWidth: 500,
        margin: '20px auto',
        padding: 3
      }}
    >
      <Typography variant="h5" mb={2}>
        Add Training
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <DateTimePicker
          label="Training Date"
          value={date}
          ampm = {false}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />
      </LocalizationProvider>

      <TextField
        label="Activity"
        fullWidth
        margin="normal"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />

      <TextField
        label="Duration (minutes)"
        fullWidth
        margin="normal"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>

        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => navigate('/customers')}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}
