import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserStatus, updateUser, deleteUser } from '../redux/userThunks';
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


const UserTable = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.user);
  const [userStatus, setUserStatus] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setUserStatus(users.reduce((acc, user) => {
      acc[user.id] = user.status === 'ACTIVE';
      return acc;
    }, {}));
  }, [users]);

  const handleEdit = (userId) => {
    const user = users.find(user => user.id === userId);
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        dispatch(fetchUsers());
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleApprovalToggle = async (userId) => {
    const currentStatus = userStatus[userId];
    const newStatus = !currentStatus;
  
    setUserStatus(prevStatus => ({
      ...prevStatus,
      [userId]: newStatus
    }));
  
    try {
      await dispatch(updateUserStatus({ userId, status: newStatus ? 'ACTIVE' : 'DISABLED' })).unwrap();
      await dispatch(fetchUsers()); 

    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status. Please try again.');
  
      setUserStatus(prevStatus => ({
        ...prevStatus,
        [userId]: currentStatus
      }));
    }
  };
  
  
  

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveChanges = () => {
    if (selectedUser && selectedUser.id) {
      dispatch(updateUser({
        userId: selectedUser.id,
        updateData: {
          name: selectedUser.name,
          email: selectedUser.email,
          location: selectedUser.location,
          books: selectedUser.books,
          phone: selectedUser.phone,
        }
      }))
      .unwrap()
      .then((updatedUser) => {
        handleCloseDialog();
  
        setUserStatus(prevState => ({
          ...prevState,
          [updatedUser.id]: updatedUser
        }));
  
        dispatch(fetchUsers());

      })
      .catch((error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
      });
    } else {
      console.error('No user selected or user ID is missing.');
    }
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

  if (users.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No users found
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '98%', overflowX: 'auto', mt: 10, ml: 1.5  }}>
      <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: "#ffff", }}>
      <Box display="flex" mt="65px" justifyContent="space-between" alignItems="center" mb={isSmallScreen ? 1 : 2}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#000000', ml: "12px", mt: "9px", fontSize: isSmallScreen ? '1rem' : '1.25rem' }}>
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
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>ID</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Owner</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Books</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Location</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Approval</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{user.id}</TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: user.name === 'John Doe' ? deepOrange[500] : deepPurple[500],
                        width: 32,
                        height: 32,
                        fontSize: '1rem'
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" ml={1} noWrap sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{user.books.length} Books</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{user.location}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {userStatus[user.id] && (
                      <Tooltip title={user.status}>
                        <CheckCircleIcon
                          sx={{ color: switchColor, fontSize: '-1srem' }}
                        />
                      </Tooltip>
                    )}
                    <FormControlLabel
                      control={
                        <Switch
                          checked={userStatus[user.id]}
                          onChange={() => handleApprovalToggle(user.id)}
                          sx={{
                            '& .MuiSwitch-thumb': {
                              backgroundColor: userStatus[user.id] ? switchColor : inactiveColor,
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: userStatus[user.id] ? switchColor : inactiveColor,
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
                      label={userStatus[user.id] ? (
                        <Typography sx={{ color: switchColor, fontSize: '0.875rem', fontWeight: 'normal', ml: -0.05 }}>
                          {user.status}
                        </Typography>
                      ) : `${user.status}`}
                      labelPlacement="start"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(user.id)} size="small">
                          <RemoveRedEye fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(user.id)} size="small">
                          <DeleteIcon fontSize="inherit" sx={{ color: 'red' }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: userStatus[user.id] ? '#00ABFF' : '#AFAFAF',
                      color: '#fff',
                      padding: '3px 12px',
                      fontSize: '0.75rem',
                      minWidth: '80px',
                      borderRadius: '4px'
                    }}
                    onClick={() => handleApprovalToggle(user.id)}
                    disabled={!userStatus[user.id]}
                  >
                    {userStatus[user.id] ? 'Approve' : 'Reject'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ width: '400px', p: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                variant="outlined"
                value={selectedUser.name || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                variant="outlined"
                value={selectedUser.email || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Location"
                variant="outlined"
                value={selectedUser.location || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, location: e.target.value })}
              />
                <TextField
                margin="normal"
                fullWidth
                label="Location"
                variant="outlined"
                value={selectedUser.phone || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;