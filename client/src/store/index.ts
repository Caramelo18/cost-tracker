import { combineReducers } from 'redux'
import { transactionsReducer } from './reducers';

const rootReducer = combineReducers({
    transactions: transactionsReducer
});

export type AppState = ReturnType<typeof rootReducer>