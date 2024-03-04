import { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, Alert } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';
import { Patient, Diagnosis } from '../../types';
import EntryItem from '../EntryModal/Entry';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const PatientPage = () => {
  const id = useParams().id as string;
  const [patient, setPatient] = useState<Patient>();
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<string>('');
  const [codes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

  useEffect(() => {
    patientService.getOne(id).then((data) => {
      setPatient(data);
    });
    const fetchDiagnosisList = async () => {
      const diagnosisList = await diagnosisService.getAll();
      const codes = diagnosisList.map((d) => d.code);
      setDiagnosisCodes(codes);
    };
    void fetchDiagnosisList();
  }, [id]);

  const closeEntryModal = (): void => {
    setOpenEntryModal(false);
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification('');
      setError('');
    }, 3000);
  };

  const submitEntry = async (value: unknown): Promise<void> => {
    try {
      if (patient) {
        const entry = await patientService.createEntry(value, patient.id);
        patient?.entries.push(entry);
        setPatient(patient);
        setOpenEntryModal(!openEntryModal);
        setNotification('success');
        clearNotification();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
          setNotification('error');
          clearNotification();
        } else {
          setError('Unrecognized axios error');
          setNotification('error');
          clearNotification();
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
        setNotification('error');
        clearNotification();
      }
    }
  };

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

          {(notification && notification === 'success') ||
          notification === 'error' ? (
            <Alert severity={notification}>
              {error ? error : 'new entry successfully added'}
            </Alert>
          ) : null}

          {openEntryModal && (
            <AddEntryModal
              close={closeEntryModal}
              submit={submitEntry}
              codes={codes}
            />
          )}

          <Box mt={4}>
            <Typography variant='h5' mb={2} mt={2}>
              Entries
            </Typography>
          </Box>
          {patient.entries && (
            <Box>
              {patient.entries.map((entry) => (
                <EntryItem key={entry.id} entry={entry} />
              ))}
            </Box>
          )}

          {!openEntryModal && (
            <Grid ml={2}>
              <Grid item>
                <Button
                  style={{
                    float: 'left',
                    marginTop: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  type='submit'
                  variant='contained'
                  onClick={() => setOpenEntryModal(!openEntryModal)}
                >
                  Add New Entry
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </div>
  );
};

export default PatientPage;
