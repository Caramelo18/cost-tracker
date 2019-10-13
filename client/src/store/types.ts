export interface Transaction {
    id: string
    value: number
    category: string
    description: string
    date: Date
    subscriptionId: string
}

export interface TransactionsHistory {
    transactions: Transaction[]
}

export const ADD_TRANSACTION = 'ADD_TRANSACTION'

interface AddTransaction {
    type: typeof ADD_TRANSACTION
    payload: Transaction
}

export type TransactionsActionTypes = AddTransaction | null