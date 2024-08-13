import { createSlice } from '@reduxjs/toolkit';
import { updateUser, updateUserStatus, fetchUsers, updateBookApproval } from '../userThunks';

const initialState = {
  currentUser: null,
  users: [],
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookApprovalRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateBookApprovalSuccess: (state, action) => {
      const { userId, bookId, approved } = action.payload;
      state.loading = false;
      state.users = state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              books: user.books.map(book =>
                book.id === bookId ? { ...book, approved } : book
              ),
            }
          : user
      );
    },
    updateBookApprovalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserStatusSuccess: (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      state.users = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
    },
    updateUserStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Book Approval
    builder.addCase(updateBookApproval.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBookApproval.fulfilled, (state, action) => {
      state.loading = false;
      const { userId, bookId, approved } = action.payload;
      state.users = state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              books: user.books.map(book =>
                book.id === bookId ? { ...book, approved } : book
              ),
            }
          : user
      );
    });
    builder.addCase(updateBookApproval.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      state.users = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update User Status
    builder.addCase(updateUserStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      state.users = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
    });
    builder.addCase(updateUserStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateBookApprovalRequest,
  updateBookApprovalSuccess,
  updateBookApprovalFailure,
  updateUserStatusRequest,
  updateUserStatusSuccess,
  updateUserStatusFailure,
} = userSlice.actions;

export default userSlice.reducer;
