const initialState = {
    loading: false,
    error: null,
    users: [], // Assuming you store users here
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_BOOK_APPROVAL_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'UPDATE_BOOK_APPROVAL_SUCCESS':
        // Update the specific book approval status in the state
        return {
          ...state,
          loading: false,
          users: state.users.map(user =>
            user.id === action.payload.userId
              ? {
                  ...user,
                  books: user.books.map((book, index) =>
                    index === action.payload.bookIndex
                      ? { ...book, approved: action.payload.approved }
                      : book
                  ),
                }
              : user
          ),
        };
      case 'UPDATE_BOOK_APPROVAL_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  