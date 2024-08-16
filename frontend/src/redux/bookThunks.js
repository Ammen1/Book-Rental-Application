import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:4000/api/v1/book';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const error = 'No token found';
      return rejectWithValue(error);
    }
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch');
      }

      const data = await response.json();
      return data.books;
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);


export const fetchBooksByOwnerId = createAsyncThunk(
  'books/fetchBooksByOwnerId',
  async (ownerId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const error = 'No token found';
      return rejectWithValue(error);
    }

    try {
      const response = await fetch(`${API_URL}/owner/${ownerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);

