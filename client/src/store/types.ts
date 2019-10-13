export interface Transaction {
    id: string
    value: number
    category: string
    description: string
    date: Date
    subscriptionId: string
}

export interface TransactionsState {
    readonly transactions: Transaction[]
}

export enum TransactionsActionTypes {
    SET_TRANSACTIONS = '@@teams/SET_TRANSACTIONS',
    ADD_TRANSACTION = '@@teams/ADD_TRANSACTIONS'
}