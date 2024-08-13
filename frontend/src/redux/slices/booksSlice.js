import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, fetchBooksByOwnerId } from '../bookThunks';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    totalEarnings: 0,  // Add totalEarnings to the state
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Handle fetchBooksByOwnerId
      .addCase(fetchBooksByOwnerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksByOwnerId.fulfilled, (state, action) => {
        state.books = action.payload.books;  // Handle the books part of the payload
        state.totalEarnings = action.payload.totalEarnings;  // Handle the totalEarnings part of the payload
        state.loading = false;
      })
      .addCase(fetchBooksByOwnerId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default booksSlice.reducer;
