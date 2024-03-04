import AddEntryForm from './AddEntryForm';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { Diagnosis } from '../../types';

interface AddEntryModalProps {
  close: () => void;
  submit: (values: unknown) => void;
  codes: Array<Diagnosis['code']>;
}
const AddEntryModal = ({ close, submit, codes }: AddEntryModalProps) => {
  const [openForm, setOpenForm] = useState(false);
  const [dialogueOpen, setDialogueOpen] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<string>('');

  const handleOpenForm = (): void => {
    setDialogueOpen(false);
    setOpenForm(true);
  };

  return (
    <>
      <Dialog open={dialogueOpen}>
        <DialogTitle>Select Entry Type</DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label='entry-type'
            name='entry-type'
            onChange={(event) => setSelectedEntry(event?.target.value)}
          >
            <FormControlLabel
              value='Hospital'
              control={<Radio />}
              label='Hospital Entry'
            />
            <FormControlLabel
              value='OccupationalHealthcare'
              control={<Radio />}
              label='Occupational Health Entry'
            />
            <FormControlLabel
              value='HealthCheck'
              control={<Radio />}
              label='Healthcheck Entry'
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleOpenForm} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {openForm && (
        <Box>
          <AddEntryForm
            close={close}
            submit={submit}
            entryType={selectedEntry}
            codes={codes}
          />
        </Box>
      )}
    </>
  );
};

export default AddEntryModal;
