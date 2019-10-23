export interface CTService {
    loadTransactions(): Promise<any>
}

export async function loadTransactions(): Promise<any> {
    const transactionsUrl = "http://localhost:8080/transactions";

    return fetch(transactionsUrl)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export async function loadBalance(): Promise<any> {
    const balanceUrl = "http://localhost:8080/balance";

    return fetch(balanceUrl)
        .then(response => response.json())
        .then(data => {
            return data.balance;
        });
}

export async function loadSubscriptions(): Promise<any> {
    const url = "http://localhost:8080/subscriptions";

    return fetch(url).then(response => response.json()).then(response => {
        return response;
    });
}

export async function loadSalaries(): Promise<any> {
    const url = "http://localhost:8080/salaries";

    return fetch(url)
        .then(response => response.json())
        .then(response => {
            return response;
        });
}

export default { loadTransactions, loadBalance, loadSubscriptions } as CTService;