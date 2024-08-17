import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const RentalHistoryPage = () => {
  const rentalHistory = [
    { id: 1, title: '1984', author: 'George Orwell', rentalDate: '2024-01-15', returnDate: '2024-02-15', status: 'Returned' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', rentalDate: '2024-02-01', returnDate: '2024-03-01', status: 'Returned' },
    // Add more rental history data here
  ];

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ bgcolor: '#fff', borderBottom: '1px solid #ddd' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#000' }}>
            Rental History
          </Typography>
          <Tooltip title="Print">
            <IconButton color="primary">
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Rental Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentalHistory.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>{rental.title}</TableCell>
                  <TableCell>{rental.author}</TableCell>
                  <TableCell>{rental.rentalDate}</TableCell>
                  <TableCell>{rental.returnDate}</TableCell>
                  <TableCell>{rental.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default RentalHistoryPage;
