import { Entry } from '../../types';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthEntry from './OccupationalHealthEntry';
import HospitalCheckEntry from './HospitalCheckEntry';

const EntryItem: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HospitalCheckEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthEntry entry={entry} />;
  }
};

export default EntryItem;
