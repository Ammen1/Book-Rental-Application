import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, TextField } from '@mui/material';
import axios from 'axios';

const Sidebar = ({ author, setAuthor, title, setTitle, location, setLocation, setCategory, category }) => {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get('https://book-rental-application.onrender.com/api/v1/categories', 
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       ); 
  //       setCategories(response.data.categories); 
  //     } catch (error) {
  //       console.error('Failed to fetch categories', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '0%', md: '200px' }, // Hide on small screens and show on medium and larger screens
        p: 2,
        bgcolor: '#f4f4f4',
        borderRight: { md: '1px solid #ddd' },
        display: { xs: 'none', sm: 'none', xl: 'none', md: 'block' }, // Hide on small and extra-large screens, show on medium and large screens
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        id="author-label"
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Book Name"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Owner Location"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default Sidebar;
