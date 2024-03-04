import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from '../../types';

const OccupationalHealthEntry: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
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
            <WorkIcon />
            <Typography variant='body1'>{entry.employerName}</Typography>
          </Box>
          <Typography variant='body1' fontStyle='italic'>
            {entry.description}
          </Typography>
        </Box>
        <Typography variant='body1' sx={{ marginTop: 1 }}>
          Diagnosed by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthEntry;
