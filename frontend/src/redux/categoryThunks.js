import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://book-rental-application.onrender.com/api/v1/categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

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
        return rejectWithValue(error.message || 'Failed to fetch categories');
      }

      const data = await response.json();
      return data.categories;
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);
