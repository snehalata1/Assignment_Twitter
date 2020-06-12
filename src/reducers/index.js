/* eslint-disable */
import { combineReducers } from 'redux';
import snackbarMessageReducer from './snackbarMessageReducer';

export default combineReducers({
    snackbarMessage: snackbarMessageReducer,
});
