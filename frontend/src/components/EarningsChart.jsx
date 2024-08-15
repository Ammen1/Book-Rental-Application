import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';



const EarningsChart = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.user?.id;


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !token) {
          throw new Error('User ID or token is missing');
        }

        const response = await fetch(`http://localhost:4000/api/v1/book/owner/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  // Prepare data for the chart
  const chartData = data.books ? data.books.map(book => ({
    month: new Date(book.createdAt).toLocaleString('en-US', { month: 'short' }),
    totalEarnings: book.price,
    previousMonthEarnings: data.previousMonthEarnings || 0
  })) : [];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Earning Summary
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
