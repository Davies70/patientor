import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Typography, Card, CardContent } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import { green, lightGreen, red, yellow } from '@mui/material/colors';

const colorMap = {
  [HealthCheckRating.Healthy]: green[900],
  [HealthCheckRating.LowRisk]: lightGreen[400],
  [HealthCheckRating.HighRisk]: yellow['A100'],
  [HealthCheckRating.CriticalRisk]: red['A700'],
};

const HospitalCheckEntry: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const style = { color: colorMap[entry.healthCheckRating] };
  return (
    <Card
      sx={{ borderRadius: 2, border: 2, borderColor: 'divider', margin: 2 }}
    >
      <CardContent>
        <Box>
          <Box display='flex' gap={1}>
            <Typography variant='body1'>{entry.date}</Typography>
            <MedicalServicesIcon />
          </Box>
          <Typography variant='body1'>{entry.description}</Typography>
          <FavoriteIcon sx={style} />
          <Typography variant='body1'>
            diagnose by {entry.specialist}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HospitalCheckEntry;
