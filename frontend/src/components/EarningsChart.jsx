import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchBooksByOwnerId } from '../redux/bookThunks'; // Adjust import path as needed

const EarningsChart = ({ ownerId }) => {
  const dispatch = useDispatch();
  const { earnings = [], loading, error } = useSelector((state) => state.earnings || {});
  console.log(earnings)

  useEffect(() => {
    if (ownerId) {
      dispatch(fetchBooksByOwnerId(ownerId));
    }
  }, [dispatch, ownerId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Earning Summary
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={earnings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalEarnings" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="previousMonthEarnings" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default EarningsChart;
