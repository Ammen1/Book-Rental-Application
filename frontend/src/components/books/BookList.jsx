import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchBooks, updateBookStatus, updateBook } from '../redux/bookThunks';
import { fetchBooks } from '../../redux/bookThunks';
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Box, IconButton, Avatar, Tooltip, Switch, FormControlLabel,
  Button, CircularProgress, Grid, TablePagination, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { RemoveRedEye } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BooksTable = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books); 
  const [bookStatus, setBookStatus] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setBookStatus(books.reduce((acc, book) => {
      acc[book.id] = book.approved;
      return acc;
    }, {}));
  }, [books]);

  const handleEdit = (bookId) => {
    const book = books.find(book => book.id === bookId);
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleDelete = (bookId) => {
    console.log('Delete book with ID:', bookId);
    alert(`Delete book with ID: ${bookId}`);
  };

  const handleApprovalToggle = async (bookId) => {
    // const currentStatus = bookStatus[bookId];
    // const newStatus = !currentStatus;

    // setBookStatus(prevStatus => ({
    //   ...prevStatus,
    //   [bookId]: newStatus
    // }));

    // try {
    //   await dispatch(updateBookStatus({ bookId, status: newStatus ? 'APPROVED' : 'REJECTED' })).unwrap();
    //   await dispatch(fetchBooks());

    // } catch (error) {
    //   console.error('Error updating book status:', error);
    //   alert('Failed to update book status. Please try again.');

    //   setBookStatus(prevStatus => ({
    //     ...prevStatus,
    //     [bookId]: currentStatus
    //   }));
    // }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleSaveChanges = () => {
    // if (selectedBook && selectedBook.id) {
    //   dispatch(updateBook({
    //     bookId: selectedBook.id,
    //     updateData: {
    //       title: selectedBook.title,
    //       author: selectedBook.author,
    //       price: selectedBook.price,
    //       quantity: selectedBook.quantity,
    //       available: selectedBook.available,
    //     }
    //   }))
    //   .unwrap()
    //   .then((updatedBook) => {
    //     handleCloseDialog();

    //     setBookStatus(prevState => ({
    //       ...prevState,
    //       [updatedBook.id]: updatedBook.approved
    //     }));

    //     dispatch(fetchBooks());

    //   })
    //   .catch((error) => {
    //     console.error('Error updating book:', error);
    //     alert('Failed to update book. Please try again.');
    //   });
    // } else {
    //   console.error('No book selected or book ID is missing.');
    // }
  };

  const switchColor = '#008000'; 
  const inactiveColor = '#e0e0e0'; 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  if (books.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No books found
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '98%', overflowX: 'auto', mt: 9, ml: 1.5  }}>
      <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: "#ffff", }}>
      <Box display="flex" mt="65px" justifyContent="space-between" alignItems="center" mb={isSmallScreen ? 1 : 2}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#000000', ml: "13px", mt: "8px", fontSize: isSmallScreen ? '1rem' : '1.25rem' }}>
          List of owners
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>NO</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Author</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Owners</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Category</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Book Name</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
              <TableRow key={book.id}>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{book.id}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{book.author}</TableCell>
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
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{book.category.name}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{book.title}</TableCell>
                {/* <TableCell>
                  <Box display="flex" alignItems="center">
                    {book.available ? (
                      <Tooltip title="Available">
                        <CheckCircleIcon sx={{ color: '#00ABFF', fontSize: '1rem' }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not Available">
                        <CheckCircleIcon sx={{ color: 'red', fontSize: '1rem' }} />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell> */}
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {bookStatus[book.id] && (
                      <Tooltip title={book.approved ? 'Approved' : 'Rejected'}>
                        <CheckCircleIcon sx={{ color: switchColor, fontSize: '1rem' }} />
                      </Tooltip>
                    )}
                    <FormControlLabel
                      control={
                        <Switch
                          checked={bookStatus[book.id]}
                          onChange={() => handleApprovalToggle(book.id)}
                          sx={{
                            '& .MuiSwitch-thumb': {
                              backgroundColor: bookStatus[book.id] ? switchColor : inactiveColor,
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: bookStatus[book.id] ? switchColor : inactiveColor,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: switchColor,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: switchColor,
                            }
                          }}
                        />
                      }
                      label={bookStatus[book.id] ? (
                        <Typography sx={{ color: switchColor, fontSize: '0.875rem', fontWeight: 'normal', ml: -0.05 }}>
                          Active
                        </Typography>
                      ) : 'Rejected'}
                      labelPlacement="start"
                    />
                  </Box>
                </TableCell>
                {/* <TableCell>
                  <Box display="flex" alignItems="center">
                    <Tooltip title="View Details">
                      <IconButton onClick={() => navigate(`/books/${book.id}`)} sx={{ p: 0 }}>
                        <Avatar
                          sx={{ bgcolor: deepPurple[500], color: '#fff', width: 32, height: 32 }}
                        >
                          <RemoveRedEye />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Book">
                      <IconButton onClick={() => handleEdit(book.id)} sx={{ p: 0 }}>
                        <Avatar
                          sx={{ bgcolor: deepOrange[500], color: '#fff', width: 32, height: 32 }}
                        >
                          <EditIcon />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Book">
                      <IconButton onClick={() => handleDelete(book.id)} sx={{ p: 0 }}>
                        <Avatar
                          sx={{ bgcolor: 'red', color: '#fff', width: 32, height: 32 }}
                        >
                          <DeleteIcon />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={selectedBook?.title || ''}
                onChange={(e) => setSelectedBook(prev => ({ ...prev, title: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                fullWidth
                value={selectedBook?.author || ''}
                onChange={(e) => setSelectedBook(prev => ({ ...prev, author: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={selectedBook?.price || ''}
                onChange={(e) => setSelectedBook(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                value={selectedBook?.quantity || ''}
                onChange={(e) => setSelectedBook(prev => ({ ...prev, quantity: parseInt(e.target.value, 10) }))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedBook?.available || false}
                    onChange={(e) => setSelectedBook(prev => ({ ...prev, available: e.target.checked }))}
                  />
                }
                label="Available"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BooksTable;
