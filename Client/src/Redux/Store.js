import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './UserSlice.js';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApi } from '../services/Jsonserverapi.js';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  [productApi.reducerPath]: productApi.reducer,
});

// Redux persist configuration for user data only
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'], // Only persist the user slice of the state
  version: 1
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and export the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

// Setup listeners for RTK query
setupListeners(store.dispatch);

// Persist store
export const persistor = persistStore(store);
