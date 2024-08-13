import {
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    location: "",
    termsAccepted: false,
    role: "USER",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [id]: type === 'checkbox' ? checked : value.trim()
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic Validation
    const { name, phone, email, password, location, role } = formData;
    if (!name || !phone || !email || !password || !location) {
      setSnackbarMessage("Please fill out all fields.");
      setSnackbarOpen(true);
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarOpen(true);
      return;
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setSnackbarMessage("Please enter a valid 10-digit phone number.");
      setSnackbarOpen(true);
      return;
    }
  
    if (!formData.termsAccepted) {
      setSnackbarMessage("You must accept the terms and conditions.");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      setLoading(true);
      setErrorMessage(null);
  
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        { name, phone, email, password, location, role },
        { withCredentials: true }
      );
  
      console.log('Response Data:', data);
  
      // Store token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log(data.token)
  
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error('Axios Error:', error);
      if (error.response) {
        if (errorMessage === "Email already registered!") {
          setSnackbarMessage("This email is already registered. Please use a different email.");
        } else {
          setSnackbarMessage(errorMessage || "An error occurred. Please try again.");
        }
      } else {
        setSnackbarMessage("Network error. Please check your connection.");
      }
      setSnackbarOpen(true);
      setLoading(false);
    }
  };
  

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        backgroundColor: '#fffff',
        padding: isSmallScreen ? 2 : 4,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isSmallScreen ? 2 : 4,
            order: isSmallScreen ? 2 : 1,
            height: isSmallScreen ? 'auto' : 'auto',
            backgroundColor: '#171B36',
            borderRadius: isSmallScreen ? '8px 8px 0 0' : '8px 0 0 8px',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="/Group 1.png"
              alt="Logo"
              style={{
                width: isSmallScreen ? '120px' : '180px',
                height: 'auto',
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isSmallScreen ? 2 : 4,
            order: isSmallScreen ? 1 : 2,
            backgroundColor: '#ffffff',
            borderRadius: isSmallScreen ? '0 0 8px 8px' : '0 8px 8px 0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ maxWidth: '400px', mx: 'auto', ml: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mt: 3,
                }}
              >
                <img
                  src="/Group 1.png"
                  alt="Logo"
                  style={{
                    width: '80px',
                    height: 'auto',
                  }}
                />
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: '#000',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 350,
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
                fontWeight: 350,
                mt: 3,
              }}
            >
              Signup as Owner
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email address"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    sx={{ color: '#00ABFF' }}
                  />
                }
                label="I accept the Terms and Conditions"
                sx={{ color: '#000' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  mt: 2,
                  backgroundColor: '#00ABFF',
                  '&:hover': {
                    backgroundColor: '#007BB5',
                  },
                  borderRadius: 1,
                }}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>
            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
                color: '#000',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Already have an account? <Link to="/signin" style={{ color: '#00ABFF' }}>Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
