import { Typography, Box, Grid, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useState, useEffect } from 'react';
import patientService from '../../services/patients';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import EntryItem from '../EntryModal/Entry';

const PatientPage = () => {
  const id = useParams().id as string;
  useEffect(() => {
    patientService.getOne(id).then((data) => {
      setPatient(data);
    });
  }, [id]);

  const [patient, setPatient] = useState<Patient>();

  return (
    <div>
      {patient && (
        <>
          <Box display='flex' mb={2} mt={2}>
            <Typography variant='h4' mr={1}>
              {patient.name}
            </Typography>
            {patient.gender === 'male' ? (
              <MaleIcon />
            ) : patient.gender === 'female' ? (
              <FemaleIcon />
            ) : (
              <TransgenderIcon />
            )}
          </Box>
          <Typography variant='body1'>SSN: {patient.ssn}</Typography>
          <Typography variant='body1'>
            Occupation: {patient.occupation}
          </Typography>
          <Typography variant='h5' mb={2} mt={2}>
            entries
          </Typography>
          {patient.entries && (
            <Box>
              {patient.entries.map((entry) => {
                return <EntryItem key={entry.id} entry={entry} />;
              })}
            </Box>
          )}
          <Grid ml={2}>
            <Grid item>
              <Button
                style={{
                  float: 'left',
                }}
                type='submit'
                variant='contained'
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default PatientPage;
