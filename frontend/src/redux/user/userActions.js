  import {
    UPDATE_BOOK_APPROVAL_FAILURE,
    UPDATE_BOOK_APPROVAL_SUCCESS,
    UPDATE_BOOK_APPROVAL_REQUEST
  } from './userActionTypes.js'
  
  export const updateBookApprovalRequest = () => ({
    type: UPDATE_BOOK_APPROVAL_REQUEST
  });
  
  export const updateBookApprovalSuccess = (userId, bookIndex, approved) => ({
    type: UPDATE_BOOK_APPROVAL_SUCCESS,
    payload: { userId, bookIndex, approved }
  });
  
  export const updateBookApprovalFailure = (error) => ({
    type: UPDATE_BOOK_APPROVAL_FAILURE,
    payload: error
  });
  