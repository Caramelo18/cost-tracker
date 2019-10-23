export interface CTService {
    loadTransactions(): Promise<any>
}

export async function loadTransactions(): Promise<any> {
    let transactionsUrl = "http://localhost:8080/transactions";

    return fetch(transactionsUrl)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export default { loadTransactions } as CTService;