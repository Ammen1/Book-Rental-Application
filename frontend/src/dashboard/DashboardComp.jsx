import { Box, Grid, CssBaseline, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../components/common/StatCard';
import BookStatusTable from '../components/BookStatusTable';
import { fetchBooksByOwnerId } from '../redux/bookThunks';

const DashboardComp = ({ ownerId }) => {
  // const dispatch = useDispatch();
  // const { books, totalEarnings, loading, error } = useSelector((state) => state.books || {});

  // useEffect(() => {
  //   if (ownerId) {
  //     dispatch(fetchBooksByOwnerId(ownerId));
  //   }
  // }, [dispatch, ownerId]);

  // if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 8,  background: "#F0F2FF" }}>

      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ mt: 4, mr: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="This Month Statistics"
                subtitle="Tue, 14 Nov, 2024, 11:30 AM"
                value= "2000" 
                change={-1.5}
                additionalInfo="Compared to ETB9940 last month. Last Month Income ETB 25658.00"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <BookStatusTable  /> 
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardComp;
