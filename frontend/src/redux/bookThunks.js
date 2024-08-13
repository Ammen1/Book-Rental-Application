// userThunks.js
import axios from '../axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  updateBookApprovalRequest,
  updateBookApprovalSuccess,
  updateBookApprovalFailure
} from './user/userActions';

const API_URL = 'http://localhost:4000/api/v1/book';

// // Thunk action to update book approval status
// export const updateBookApproval = (userId, bookIndex, approved) => async (dispatch) => {
//   dispatch(updateBookApprovalRequest());

//   try {
//     const response = await axios.put(`http://localhost:4000/api/v1/book/${bookIndex}`, {
//       approved
//     });
//     dispatch(updateBookApprovalSuccess(userId, bookIndex, approved));
//   } catch (error) {
//     dispatch(updateBookApprovalFailure(error.message));
//   }
// };

// Replace with your actual API URL

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
      return data; // Return the full data object
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);

