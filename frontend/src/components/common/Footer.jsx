// src/pages/Dashboard.jsx
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import EarningsChart from '../EarningsChart';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin/Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">This Month Statistics</Typography>
              <Typography variant="subtitle2">Tue, 14 Nov, 2024, 11:30 AM</Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>ETB 9460.00</Typography>
              <Typography variant="body2">Compared to ETB9940 last month</Typography>
              <Typography variant="body2">Last Month Income ETB 25658.00</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Available Books</Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>Today</Typography>
              <Box sx={{ mt: 2 }}>
                <img src="/path-to-pie-chart.png" alt="Pie Chart" />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Live Book Status</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">No. | Book no. | Owner | Status | Price</Typography>
                <EarningsChart />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Earning Summary</Typography>
              <Box sx={{ mt: 2 }}>
                <img src="/path-to-line-chart.png" alt="Line Chart" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
