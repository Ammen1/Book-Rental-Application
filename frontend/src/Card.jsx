import { useState } from 'react';
import { Container, Grid, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Box } from '@mui/material';

const Signup = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    phoneNumber: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid container>
        <Grid item xs={12} md={6} sx={{ backgroundColor: '#0E1E40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <img src="/path-to-your-logo.png" alt="Logo" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Book Rent
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Signup as Owner
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email address"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={formValues.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                }
                label="I accept the Terms and Conditions"
              />
              <Button type="submit" fullWidth variant="contained" color="primary">
                Sign Up
              </Button>
            </form>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account? <Link href="/auth/login">Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
