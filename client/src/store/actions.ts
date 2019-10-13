import { action } from 'typesafe-actions';
import { Transaction, TransactionsActionTypes } from './types';

export const setTransactions = (transactions: Transaction[]) => action(TransactionsActionTypes.SET_TRANSACTIONS, transactions);
export const addTransaction = (transaction: Transaction) => action(TransactionsActionTypes.ADD_TRANSACTION, transaction);