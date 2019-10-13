import { combineReducers } from 'redux'
import { transactionsReducer } from './reducers';
import { TransactionsState } from './types';

export const rootReducer = combineReducers({
    transactions: transactionsReducer
});

export interface ApplicationState {
    transactions: TransactionsState
}  
