import { Transaction, TransactionsHistory, ADD_TRANSACTION, TransactionsActionTypes } from './types';

export function addTransaction(newTransaction: Transaction): TransactionsActionTypes {
    return {
        type: ADD_TRANSACTION,
        payload: newTransaction
    }
}