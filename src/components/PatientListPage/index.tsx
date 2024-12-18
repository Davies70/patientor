import { useState } from 'react';
import '../../styles/PageList.css';
import {
  Box,
  Table,
  Button,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient } from '../../types';
import AddPatientModal from '../AddPatientModal';

import HealthRatingBar from '../HealthRatingBar';

import patientService from '../../services/patients';

import { Link } from 'react-router-dom';

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table style={{ marginBottom: '1em' }} className='table' stickyHeader>
      <TableHead
        style={{
        background: 'green',
        width: '100%',
        }}
      >
        <TableRow className='row'>
        <TableCell style={{ color: 'color' }}>Name</TableCell>
        <TableCell>Gender</TableCell>
        <TableCell>Occupation</TableCell>
        <TableCell>Health Rating</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(patients).map((patient: Patient) => (
        <TableRow key={patient.id}>
          <TableCell>
          <Link to={`patients/${patient.id}`}>{patient.name}</Link>
          </TableCell>
          <TableCell>{patient.gender}</TableCell>
          <TableCell>{patient.occupation}</TableCell>
          <TableCell>
          <HealthRatingBar
            showText={true}
            rating={1}
            id={patient.id}
            healthRating={patient.healthRating}
          />
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      <AddPatientModal
      modalOpen={modalOpen}
      onSubmit={submitNewPatient}
      error={error}
      onClose={closeModal}
      />
      <Button variant='contained' onClick={() => openModal()}>
      Add New Patient
      </Button>
    </Box>
  );
};

export default PatientListPage;
