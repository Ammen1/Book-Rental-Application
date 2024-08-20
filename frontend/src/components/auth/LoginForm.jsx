import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../../redux/slices/userSlice';

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '', role: 'USER' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (event) => {
    setFormData((prevData) => ({ ...prevData, role: event.target.value }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Please fill in all the fields'));
      setOpenSnackbar(true);
      return;
    }

    dispatch(signInStart(formData));

    try {
      const response = await fetch('https://book-rental-application.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        dispatch(signInFailure(data.message));
        setOpenSnackbar(true);
        return;
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      component="main"
      maxWidth="false"
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 0,
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          height: '100%',
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Left side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: '#171B36',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isSmallScreen ? 2 : 4,
            height: '100%',
            borderRadius: isSmallScreen ? '0 0 8px 8px' : '8px 0 0 8px',
            position: isSmallScreen ? 'relative' : 'static',
            order: isSmallScreen ? 2 : 1,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="/Group 1.png"
              alt="Logo"
              style={{
                width: isSmallScreen ? '150px' : '180px',
                height: 'auto',
              }}
            />
          </Box>
        </Grid>

        {/* Right side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isSmallScreen ? 2 : 4,
            height: '100%',
            borderRadius: isSmallScreen ? '8px 8px 0 0' : '0 8px 8px 0',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            order: isSmallScreen ? 1 : 2,
          }}
        >
          <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <img
                  src="/Group 1.png"
                  alt="Logo"
                  style={{ width: '60px', height: 'auto' }}
                />
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: '#000',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Book Rent
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{
                color: '#000',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
              }}
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                margin="normal"
                label="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="OWNER">Owner</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Sign In 
                 {/* <CircularProgress size={24} /> */}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={3} sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Don’t have an account?{' '}
                <Link href="/signup" variant="body2">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
