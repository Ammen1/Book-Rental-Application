import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categoryThunks';
import { fetchBooks } from '../../redux/bookThunks';
import { Autocomplete, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { API_URL, BASE_URL } from '../../config';

const BookForm = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    categoryId: '',
    quantity: '',
    price: '',
  });
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  // Get categories, loading, and error from Redux store
  const { categories, loading, error } = useSelector((state) => state.categories);
  const { books } = useSelector((state) => state.books);

  // Fetch categories from Redux store when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBooks())
  }, [dispatch]);

  // Handle open/close of the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewBook({
      title: '',
      author: '',
      categoryId: '',
      quantity: '',
      price: '',
    });
  };

  // Handle form submission
  const handleCreateOrUpdateBook = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (!token) {
        console.error('Token not found');
        return;
      }

      // Validate fields
      if (!newBook.title || !newBook.author || !newBook.categoryId || isNaN(newBook.categoryId) || Number(newBook.categoryId) <= 0) {
        console.error('Validation failed:', 'Title is required, Author is required, Category ID must be a positive integer');
        return;
      }

      const bookData = {
        title: newBook.title,
        author: newBook.author,
        categoryId: newBook.categoryId,
        quantity: newBook.quantity,
        price: newBook.price,
        ownerId: currentUser.user.id, 
      };

      if (selectedBook) {
        // Update existing book
        await axios.put(`${API_URL}/book/${selectedBook.id}`, bookData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      } else {
        // Create new book
        await axios.post(`${API_URL}/book`, bookData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      navigate('/success'); // Redirect to SuccessPage
      handleClose();
    } catch (error) {
      console.error('Error creating/updating book:', error.response ? error.response.data : error.message);
    }
  };

  // Handle input change for new book fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Handle book selection
  const handleBookChange = (event, newValue) => {
    if (newValue?.id === 'new') {
      setSelectedBook(null);
      handleClickOpen(); 
    } else {
      setSelectedBook(newValue);
      setNewBook({
        title: newValue.title,
        author: newValue.author,
        categoryId: newValue.categoryId,
        quantity: newValue.quantity,
        price: newValue.price,
      });
    }
  };

  if (loading) return <Typography>Loading categories...</Typography>;
  if (error) return <Typography color="error">Error loading categories: {error}</Typography>;

  return (
    <Box sx={{ padding: 4, backgroundColor: '#ffff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>Upload Books</Typography>
      <Autocomplete
        options={[...books, { title: 'Add New', id: 'new' }]}
        getOptionLabel={(option) => option.title || ''}
        onChange={handleBookChange}
        renderInput={(params) => <TextField {...params} label="Search Books" variant="outlined" />}
        sx={{ width: '56%', maxWidth: 320, marginBottom: 2 }}
      />

      <Grid container spacing={2} sx={{ width: '100%', maxWidth: 686, marginBottom: 1 }}>
        <Grid item xs={12} sm={6} sx={{ maxWidth: 286, marginBottom: 1 }} >
          <TextField
            label="Quantity"
            fullWidth
            variant="outlined"
            name="quantity"
            value={newBook.quantity}
            onChange={handleInputChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            fullWidth
            variant="outlined"
            name="price"
            value={newBook.price}
            onChange={handleInputChange}
            type="number"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#00ABFF', '&:hover': { backgroundColor: '#008BCC' }, marginBottom: 2 }}
        onClick={handleCreateOrUpdateBook}
      >
        {selectedBook ? 'Update Book' : 'Submit'}
      </Button>

      {/* Modal for Adding New Book */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Book Title"
                name="title"
                fullWidth
                variant="outlined"
                value={newBook.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author Name"
                name="author"
                fullWidth
                variant="outlined"
                value={newBook.author}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={newBook.categoryId}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrUpdateBook} 
            sx={{ backgroundColor: '#00ABFF', '&:hover': { backgroundColor: '#008BCC' } }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookForm;
