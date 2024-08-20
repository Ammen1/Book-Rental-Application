import { useState, useEffect, useMemo } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import Header from './Header';
import Sidebar from './SidebarHome';
import FeaturedBooks from './FeaturedBooks';
import axios from 'axios';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('')

  useEffect(() => {
    axios.get('https://book-rental-application.onrender.com/api/v1/book', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(true)}`
      }
    })
      .then((response) => {
        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          setError('Failed to fetch books. Please try again later.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error, 'Failed to fetch books. Please try again later.');
        setLoading(false);
      });
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if (author && book.author !== author) return false;
      if (title && !book.title.toLowerCase().includes(title.toLowerCase())) return false;
      if (location && !book.owner.location.toLowerCase().includes(location.toLowerCase()))return false;
      if (category && !book.category.name.toLowerCase().includes(category.toLowerCase()))return false;
      return true;
    });
  }, [books, author,  title, location, category]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',  }}>
      <Header />
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={3} md={2}>
          <Sidebar
            author={author}
            setAuthor={setAuthor}
            title={title}
            setTitle={setTitle}
            location={location}
            setLocation={setLocation}
            category={category}
            setCategory={setCategory}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" ml="30px" gutterBottom>
              Featured Books
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : filteredBooks.length === 0 ? (
              <Typography variant="body1">No books found.</Typography>
            ) : (
              <FeaturedBooks books={filteredBooks} handleCardClick={() => {}} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
