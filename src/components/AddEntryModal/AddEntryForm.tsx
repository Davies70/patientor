import { useState, SyntheticEvent } from 'react';
import {
  TextField,
  Box,
  Grid,
  Button,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  OutlinedInput,
  Rating,
} from '@mui/material';
import { Diagnosis, HealthCheckRating } from '../../types';

interface AddEntryFormProp {
  close: () => void;
  submit: (values: unknown) => void;
  entryType: string;
  codes: Array<Diagnosis['code']>;
}

const AddEntryForm = ({
  close,
  submit,
  entryType,
  codes,
}: AddEntryFormProp) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>();
  const [codeStar, setCodeStar] = useState<number>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const onEntrySubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    let values: unknown;
    switch (entryType) {
      case 'HealthCheck':
        values = {
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes,
          type: entryType,
        };
        break;
      case 'Hospital':
        values = {
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          type: entryType,
        };
        break;
      default:
        values = {
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
          type: entryType,
        };
        break;
    }

    submit(values);
  };

  const handleCodeChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRatingChange = (value: number | null) => {
    if (value === 1) {
      setHealthCheckRating(HealthCheckRating.CriticalRisk);
    } else if (value === 2) {
      setHealthCheckRating(HealthCheckRating.HighRisk);
    } else if (value === 3) {
      setHealthCheckRating(HealthCheckRating.LowRisk);
    } else if (value === 4) {
      setHealthCheckRating(HealthCheckRating.Healthy);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        border: '1px dotted',
        p: 2,
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        mt: '20px',
      }}
      onSubmit={onEntrySubmit}
    >
      <Typography variant='h5' component='h2' gutterBottom>
        New{' '}
        {entryType === 'Hospital'
          ? 'hospital'
          : entryType === 'HealthCheck'
          ? 'healthcheck'
          : 'occupational healthcare'}{' '}
        entry
      </Typography>
      <TextField
        name='Description'
        label='Description'
        value={description}
        margin='normal'
        fullWidth
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        label='Date'
        name='date'
        type='date'
        value={date}
        margin='normal'
        fullWidth
        onChange={(event) => setDate(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name='Specialist'
        label='Specialist'
        value={specialist}
        margin='normal'
        fullWidth
        onChange={(event) => setSpecialist(event.target.value)}
      />
      {entryType === 'OccupationalHealthcare' && (
        <TextField
          name='employerName'
          label='Employer Name'
          value={employerName}
          margin='normal'
          fullWidth
          onChange={(event) => setEmployerName(event.target.value)}
        />
      )}
      {entryType === 'OccupationalHealthcare' && (
        <>
          <Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>
            Sickleave
          </Typography>
          <Box ml={2}>
            <TextField
              type='date'
              name='startDate'
              label='start'
              value={startDate}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <TextField
              type='date'
              name='endDate'
              label='end'
              value={endDate}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Box>
        </>
      )}
      {entryType === 'HealthCheck' && (
        <>
          <Typography variant='subtitle1' gutterBottom>
            Healthcheck Rating:
          </Typography>
          <Rating
            name='rating'
            max={4}
            onChange={(_event, value) => handleRatingChange(value)}
            value={codeStar}
          />
        </>
      )}
      {entryType === 'Hospital' && (
        <>
          <Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>
            Discharge
          </Typography>
          <Box ml={2}>
            <TextField
              label='Discharge date'
              name='discharge date'
              type='date'
              value={dischargeDate}
              margin='normal'
              fullWidth
              onChange={(event) => setDischargeDate(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name='discharge-criteria'
              label='criteria'
              value={dischargeCriteria}
              margin='normal'
              fullWidth
              onChange={(event) => setDischargeCriteria(event.target.value)}
            />
          </Box>
        </>
      )}

      <FormControl sx={{ m: 3, ml: 0, width: 555 }}>
        <InputLabel id='diagnosis-code'>Diagnosis code</InputLabel>
        <Select
          labelId='diagnosis-code'
          multiple
          value={diagnosisCodes || []}
          onChange={handleCodeChange}
          input={<OutlinedInput label='Diagnosis code' />}
        >
          {codes.map((code) => (
            <MenuItem value={code} key={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            color='error'
            variant='contained'
            fullWidth
            onClick={() => close()}
          >
            CANCEL
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button type='submit' color='primary' variant='contained' fullWidth>
            ADD
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEntryForm;
