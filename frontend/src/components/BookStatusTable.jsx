import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Box, TablePagination, RadioGroup, FormControlLabel, Radio,
  Avatar, IconButton, Tooltip, useMediaQuery
} from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { fetchBooks } from '../redux/bookThunks'; 
import EarningsChart from './EarningsChart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BookStatusTable = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books); 
  const { currentUser } = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  // Fetch books when the component mounts
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Edit row with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleted row with id: ${id}`);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Paper
      sx={{
        p: isSmallScreen ? 1 : 3,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        width: isSmallScreen ? '100%' : '215%',
        maxWidth: isSmallScreen ? '100%' : '600px',
        margin: 'auto',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={isSmallScreen ? 1 : 2}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#000000', fontSize: isSmallScreen ? '1rem' : '1.25rem' }}>
          Live Book Status
        </Typography>
        <img
          src="filter.png"
          alt="Filter"
          style={{
            width: isSmallScreen ? '60px' : '90px',
            height: 'auto',
            marginRight: '20px',
          }}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FFFFFF' }}>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>No.</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>Book No.</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>Owner</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>Status</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>Price</TableCell>
              {currentUser.user.role === 'OWNER' && (
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book, index) => (
              <TableRow key={book.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#FFFFFF' } }}>
                <TableCell align="left" sx={{ fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell align="left" sx={{ fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>{book.quantity}</TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: book.owner.name === 'Nardos T' ? deepOrange[500] : deepPurple[500],
                        width: isSmallScreen ? 20 : 24,
                        height: isSmallScreen ? 20 : 24,
                        fontSize: isSmallScreen ? '0.75rem' : '1rem',
                      }}
                    >
                      {book.owner.name.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="body2"
                      ml={1}
                      sx={{ fontSize: isSmallScreen ? '0.75rem' : '0.875rem' }}
                    >
                      {book.owner.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <RadioGroup row value={book.available ? 'Free' : 'Rented'}>
                    <FormControlLabel
                      value={book.available ? 'Free' : 'Rented'}
                      control={
                        <Radio
                          sx={{
                            color: book.available ? '#00ABFF' : 'red',
                            '&.Mui-checked': {
                              color: book.available ? '#00ABFF' : 'red',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>
                          {book.available ? 'Free' : 'Rented'}
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </TableCell>
                <TableCell align="left" sx={{ fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}>{book.price}<span> birr</span></TableCell>
                {currentUser.user.role === 'OWNER' && (
                  <TableCell align="left">
                    <Box display="flex" justifyContent="center">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(book.id)} size={isSmallScreen ? "small" : "medium"}>
                          <EditIcon fontSize={isSmallScreen ? "small" : "inherit"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(book.id)} color="error" size={isSmallScreen ? "small" : "medium"}>
                          <DeleteIcon fontSize={isSmallScreen ? "small" : "inherit"} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ fontSize: isSmallScreen ? '0.75rem' : 'inherit' }}
      />
      <Box mt={3}>
        <EarningsChart />
      </Box>
    </Paper>
  );
};

export default BookStatusTable;
