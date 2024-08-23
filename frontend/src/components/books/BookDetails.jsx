import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Rating,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL, BASE_URL } from '../../config';

const BookDetailsPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [relatedBooksTilte, setRelatedBooksTilte] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const { id } = useParams();


  useEffect(() => {
    axios
      .get(`${BASE_URL}/book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(true)}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setBook(response.data.book);
          setRelatedBooks(response.data.relatedBooksByLocation);
          setRelatedBooksTilte(response.data.relatedBooksByTiltes)
        } else {
          setError('Failed to fetch book details. Please try again later.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch book details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    axios.put(
      `${BASE_URL}book/${id}`,
      { rating: newValue },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!book) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Book not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #ddd', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
            Book Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={book.image || '/th.jpeg'}
                alt={book.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                  {book.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  by {book.author}
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  {book.description}
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  Quantity: {book.quantity}
                </Typography>
                <Typography variant="h5" color="primary" paragraph sx={{ mb: 2 }}>
                  Rental Price: {book.price}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Your Rating:
                  </Typography>
                  <Rating
                    name="user-rating"
                    value={rating}
                    onChange={handleRatingChange}
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, py: 1.5, px: 3, fontSize: '1rem', borderRadius: '8px' }}
                >
                  Rent Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {relatedBooks.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Related Books Based on Location and Owners
            </Typography>
            <Grid container spacing={3}>
              {relatedBooks.map((relatedBook) => (
                <Grid item xs={12} sm={6} md={4} key={relatedBook.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={relatedBook.image || '/th.jpeg'}
                      alt={relatedBook.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {relatedBook.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        by {relatedBook.author}
                      </Typography>
                      <Typography variant="body2" color="text.primary" paragraph>
                        Rental Price: {relatedBook.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 1 }}
                        href={`/book/${relatedBook.id}`}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        
        {relatedBooksTilte.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Related Books Based on Books Name 
            </Typography>
            <Grid container spacing={3}>
              {relatedBooksTilte.map((relatedBooktilte) => (
                <Grid item xs={12} sm={6} md={4} key={relatedBooktilte.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={relatedBooktilte.image || '/th.jpeg'}
                      alt={relatedBooktilte.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {relatedBooktilte.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        by {relatedBooktilte.author}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' paragraph>
                        {relatedBooktilte.owner.location}
                      </Typography>
                      <Typography variant="body2" color="text.primary" paragraph>
                        Rental Price: {relatedBooktilte.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 1 }}
                        href={`/book/${relatedBooktilte.id}`}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BookDetailsPage;
