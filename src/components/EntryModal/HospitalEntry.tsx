import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry as Prop } from '../../types';

const HospitalEntry: React.FC<{ entry: Prop }> = ({ entry }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        border: 2,
        borderColor: 'divider',
        margin: 2,
        paddingBottom: 1,
      }}
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
          <Box gap={2}>
            <Typography variant='body1'>
              Discharged on {entry.discharge.date}
            </Typography>
            <Typography variant='body1'>
              Reason for discharge: {entry.discharge.criteria}
            </Typography>
          </Box>
        </Box>
        <Typography variant='body1' sx={{ marginTop: 1 }}>
          Diagnosed by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HospitalEntry;
