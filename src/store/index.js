import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import exams from './slices/examsSlice';
import auth from './slices/authSlice';
import dkhp from './slices/dkhpSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};
const createRootReducer = (history) =>
  combineReducers({
    exams,
    auth,
    dkhp,
    router: connectRouter(history)
  });
export const history = createBrowserHistory();
const store = configureStore({
  reducer: persistReducer(persistConfig, createRootReducer(history)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(routerMiddleware(history))
});

export default store;
