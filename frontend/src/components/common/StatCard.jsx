
import { Paper, Typography, Box } from '@mui/material';
import CustomPieChart from '../PieChart';
import CategoryChartContainer from '../CategoryChartContainer';

const StatCard = ({ title, subtitle, value, change, additionalInfo }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: '#Fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '200px',
      }}
    >
      <Box mb={2}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#1E293B' }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: '#64748B' }}>
          {subtitle}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{ mt: 2, color: '#0F172A', fontWeight: 'bold' }}
        >
          {value}
        </Typography>
        {change && (
          <Typography
            variant="body2"
            sx={{
              color: change < 0 ? '#EF4444' : '#10B981',
              mt: 1,
              fontWeight: 'medium',
            }}
          >
            {change}%
          </Typography>
        )}
      </Box>
      <Box mt={2}>
        <Typography
          variant="body2"
          sx={{ color: '#475569', mb: 2,  }}
        >
          {additionalInfo}
        </Typography>
        <CategoryChartContainer />
      </Box>
    </Paper>
  );
};

export default StatCard;
