import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import axios from 'axios';

const Sidebar = ({  author, setAuthor, title, setTitle, location, setLocation, setCategory, category }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    const token = localStorage.getItem('token')
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/categories', 

            { headers: { Authorization: `Bearer ${token}` } }
        ); 
        setCategories(response.data.categories); 
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '250px', },
        p: 2,
        bgcolor: '#f4f4f4',
        borderRight: { md: '1px solid #ddd' },
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />
        <TextField id="author-label"
          labelId="author-label"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          label="Author"
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
