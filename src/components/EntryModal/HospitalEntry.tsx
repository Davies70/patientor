import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { HospitalEntry as Prop } from '../../types';

const HospitalEntry: React.FC<{ entry: Prop }> = ({ entry }) => {
  return (
    <Card
      sx={{ borderRadius: 2, border: 2, borderColor: 'divider', margin: 2 }}
    >
      <CardContent>
        <Box>
          <Box display='flex' gap={1}>
            <Typography variant='body1'>{entry.date}</Typography>
            <LocalHospitalIcon />
          </Box>
          <Typography variant='body1' fontStyle='italic'>
            {entry.description}
          </Typography>
          <Box  gap={2}>
            <Typography variant='body1'>
              discharged on {entry.discharge.date}
            </Typography>
            <Typography variant='body1'>reason for discharge: {entry.discharge.criteria}</Typography>
          </Box>
          <Typography variant='body1'>
            diagnose by {entry.specialist}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HospitalEntry;
