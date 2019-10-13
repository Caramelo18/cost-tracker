import { TransactionsActionTypes, TransactionsState } from './types';
import { Reducer } from 'redux';

export const initialState: TransactionsState = {
    transactions: []
}

export const transactionsReducer: Reducer<TransactionsState> = ( state = initialState, action) =>
 {
    console.log("REDUCER");
    switch (action!.type) {
        case TransactionsActionTypes.ADD_TRANSACTION:
            let newState = state.transactions.slice();
            newState.concat(action.payload);
            console.log("adding transaction redux");
            return { transactions: newState };
        case TransactionsActionTypes.SET_TRANSACTIONS:
            console.log("setting transactions redux");
            return { transactions: action.payload };
        default:
            return state;
    }
}
