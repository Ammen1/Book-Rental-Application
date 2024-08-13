import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchUsersStart, 
    fetchUsersSuccess, 
    fetchUsersFailure,    
    updateBookApprovalRequest,
    updateBookApprovalSuccess,
    updateBookApprovalFailure, 
    updateStart,
    updateSuccess,
    updateFailure,
    updateUserStatusFailure,
    updateUserStatusRequest,
    updateUserStatusSuccess,
} from './slices/userSlice';

// Fetch Users Thunk
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(fetchUsersStart());

    const token = localStorage.getItem('token');
    if (!token) {
      const error = 'No token found';
      dispatch(fetchUsersFailure(error));
      return rejectWithValue(error);
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/users/getusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || 'Failed to fetch users');
      }

      const data = await response.json();
      dispatch(fetchUsersSuccess(data.users));
      return data.users;
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
      return rejectWithValue(error.message);
    }
  }
);


export const updateBookApproval = createAsyncThunk(
  'user/updateBookApproval',
  async ({ userId, bookId, approved }, { dispatch, rejectWithValue }) => {
    dispatch(updateBookApprovalRequest());

    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/book/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ approved }),
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || 'Failed to update book approval');
      }

      const data = await response.json();
      dispatch(updateBookApprovalSuccess({ userId, bookId, approved }));
      return data;
    } catch (error) {
      dispatch(updateBookApprovalFailure(error.message));
      return rejectWithValue(error.message);
    }
  }
);

// Update User Thunk
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updateData }, { dispatch, rejectWithValue }) => {
    dispatch(updateStart());

    console.log('Updating user with ID:', userId); // Add this line
    console.log('Update data:', updateData); // Add this line

    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData), 
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      dispatch(updateSuccess(data));
      return data;
    } catch (error) {
      dispatch(updateFailure(error.message));
      return rejectWithValue(error.message || 'Failed to update user');
    }
  }
);

// Update User Status Thunk
export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ userId, status }, { dispatch, rejectWithValue }) => {
    dispatch(updateUserStatusRequest());

    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      dispatch(updateUserStatusSuccess(data));
      return data;
    } catch (error) {
      dispatch(updateUserStatusFailure(error.message));
      return rejectWithValue(error.message || 'Failed to update user status');
    }
  }
);
