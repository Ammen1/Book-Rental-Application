import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import booksReducer from '../redux/slices/booksSlice'; // Corrected to match the combineReducers reference
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categoriesReducer from '../redux/slices/categoriesSlice'; // Adjust import path as needed


const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
  categories: categoriesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
